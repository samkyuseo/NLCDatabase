const express = require('express');
const fs = require('fs');
const router = express.Router();
const auth = require('../../middleware/auth');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const convert = require('xml-js');
const { check, validationResult } = require('express-validator');
const requestbin = require('requestbin');
const axios = require('axios');
const os = require('os');
const http = require('http');
const url = require('url');
const fastXMLParser = require('fast-xml-parser');
const uuid = require('uuid/v1');

const Transcript = require('../../models/Transcript');
const SavedSearch = require('../../models/SavedSearch');

//credentials
const config = require('config');
const username = config.get('TVEyesUsername');
const password = config.get('TVEyesPassword');
const feedPartnerId = config.get('FeedPartnerId');

//bodyparser
const xmlparser = require('express-xml-bodyparser');

//@route POST api/transcripts
//@descript Post individual transcript
//@access Private

router.post(
  '/',
  [
    auth,
    [
      check('programName', 'Program name is required')
        .not()
        .isEmpty(),
      check('date', 'Date is required')
        .not()
        .isEmpty(),
      check('city', 'City is required')
        .not()
        .isEmpty(),
      check('station', 'Station is required')
        .not()
        .isEmpty(),
      check('fullText', 'Full text is required')
        .not()
        .isEmpty(),
      check('viewership', 'Viewership is required')
        .not()
        .isEmpty(),
      check('totalViewership', 'Total viewership is required')
        .not()
        .isEmpty(),
      check('videoLink', 'Video Link is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      programName,
      date,
      state,
      city,
      station,
      fullText,
      videoLink,
      viewership,
      totalViewership
    } = req.body;

    const transcriptFields = {};

    if (programName) transcriptFields.programName = programName;
    if (date) transcriptFields.date = date;
    if (city) transcriptFields.city = city;
    if (state) transcriptFields.state = state;
    if (station) transcriptFields.station = station;
    if (fullText) transcriptFields.fullText = fullText;
    if (videoLink) transcriptFields.videoLink = videoLink;
    if (viewership) transcriptFields.viewership = viewership;
    if (totalViewership) transcriptFields.totalViewership = totalViewership;

    try {
      transcript = new Transcript(transcriptFields);
      await transcript.save();
      res.json(transcript);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route GET api/transcripts/:transcript_id
//@descript Get transcript by transcript id
//@access Public

router.get('/:transcript_id', async (req, res) => {
  try {
    const transcript = await Transcript.findById(req.params.transcript_id);

    if (!transcript) {
      return res.status(400).json({ msg: 'Transcript not found' });
    }
    res.json(transcript);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Transcript not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route GET api/transcripts
//@descript Get all transcripts
//@access Public

router.get('/', async (req, res) => {
  try {
    const transcripts = await Transcript.find().populate();
    res.json(transcripts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Transcript not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route POST api/transcripts/:query_string
//@descript Test
//@access Public
router.post('/query/:query_string', async (req, res) => {
  try {
    var SSXML = await axios.post(
      'http://mmsapi.tveyes.com/SavedSearch/savedsearchproxy.aspx?partnerID=20581&Action=add&searchquery=' +
        req.params.query_string +
        '&destination=http://13.56.143.45:5000/api/transcripts/receiver'
    );

    console.log(SSXML.data);
    var SSJSON = convert.xml2json(SSXML.data, { compact: true, spaces: 4 });

    SSJSON = JSON.parse(SSJSON).SavedSearchAPI;

    SavedSearchFields = {};

    if (SSJSON.SavedSearch._attributes.SearchGUID) {
      SavedSearchFields.SearchGUID = SSJSON.SavedSearch._attributes.SearchGUID;
    }
    if (SSJSON.SavedSearch.SearchQuery._text) {
      SavedSearchFields.SearchQuery = SSJSON.SavedSearch.SearchQuery._text;
    }
    var date = new Date();
    SavedSearchFields.SearchDate =
      date.getFullYear() +
      ', ' +
      Number(Number(date.getMonth()) + 1) +
      ', ' +
      date.getDate();

    //Save saved search object
    savedSearch = new SavedSearch(SavedSearchFields);
    await savedSearch.save();
    res.json(savedSearch);
  } catch (err) {
    console.error('ERROR MESSAGE: ' + err);
    // console.error(err.msg);
    res.status(500).send('Server Error');
  }
});

//@router  api/transcripts/reciever
//@descript reciever data and put into db once query has been searched
//@access Public

router.post('/receiver', async (req, res) => {
  try {
    console.log('***COMING INTO RECEIVER***');
    console.log('===req===');
    const UUID = uuid();
    console.log('UUID: ' + UUID);
    console.log('HEADERS: ' + JSON.stringify(req.headers));

    var XMLRes = req.body
      .toString()
      .replace('ï»¿', '')
      .replace('\n', '')
      .replace('\r', '');

    JSONRes = fastXMLParser.parse(XMLRes);

    fs.writeFile(`Output${UUID}.txt`, req.body, err => {
      // In case of a error throw err.
      if (err) throw err;
    });

    // console.log(JSON.stringify(JSONRes));
    // return res.json(JSONRes);

    //Extract data needed
    const transcriptFields = {};
    if (JSONRes.Message.Header.Source.SavedSearch.SearchQuery) {
      transcriptFields.queryString =
        JSONRes.Message.Header.Source.SavedSearch.SearchQuery;
    }
    if (JSONRes.Message.Body.Page.BroadcastMetadata.ProgramInfo.Title) {
      transcriptFields.programName =
        JSONRes.Message.Body.Page.BroadcastMetadata.ProgramInfo.Title;
    }
    if (
      JSONRes.Message.Body.Page.BroadcastMetadata.ProgramInfo.RecordDateTime
    ) {
      transcriptFields.date =
        JSONRes.Message.Body.Page.BroadcastMetadata.ProgramInfo.RecordDateTime;
    }
    if (JSONRes.Message.Body.Page.BroadcastMetadata.Station.Location) {
      transcriptFields.state = JSONRes.Message.Body.Page.BroadcastMetadata.Station.Location.split(
        ','
      )[0];
      transcriptFields.city = JSONRes.Message.Body.Page.BroadcastMetadata.Station.Location.split(
        ','
      )[1];
    }
    if (JSONRes.Message.Body.Page.BroadcastMetadata.Station.StationName) {
      transcriptFields.station =
        JSONRes.Message.Body.Page.BroadcastMetadata.Station.StationName;
    }
    if (JSONRes.Message.Body.Excerpts.TranscriptExcerpt) {
      transcriptFields.fullText =
        JSONRes.Message.Body.Excerpts.TranscriptExcerpt;
    }
    if (JSONRes.Message.Body.Page.BroadcastMetadata.TranscriptUrl) {
      transcriptFields.videoLink =
        JSONRes.Message.Body.Page.BroadcastMetadata.TranscriptUrl;
    }
    transcriptFields.totalViewership = 'n/a';
    transcriptFields.viewership = 'n/a';
    console.log(transcriptFields);
    transcript = new Transcript(transcriptFields);
    await transcript.save();
    res.json(transcript);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
