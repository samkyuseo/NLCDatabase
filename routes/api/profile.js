const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const Profile = require('../../models/Profile');
const Transcript = require('../../models/Transcript');
const User = require('../../models/User');
const fs = require('fs');
const Receiver = require('../../models/Receiver');

//@route GET api/profile/me
//@descript Get current user's profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route POST api/profile
//@descript Create a user profile
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check('researchTopic', 'Research topic is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { researchTopic } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (researchTopic) profileFields.researchTopic = researchTopic;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Udpate
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route GET api/profile
//@descript Get all profiles
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//@descript get profile by user id
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//@route DEL api/profile
//@descript Delete profile and user
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// //@route PUT api/profile/searchHistory
// //@descript Add profile searchHistory
// //@access Private

// router.put(
//   '/searchHistory',
//   [
//     auth,
//     [
//       check('searchString', 'Search String is required')
//         .not()
//         .isEmpty(),
//       check('searchResults', 'Search Results is required')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { searchString, searchResults } = req.body;
//     const searchDate = Date.now();
//     const newHistory = {
//       searchString,
//       searchResults,
//       searchDate
//     };
//     try {
//       const profile = await Profile.findOne({ user: req.user.id });
//       profile.searchHistory.unshift(newHistory);
//       await profile.save();
//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

//@route DEL api/profile/searchHistory/:hist_id
//@descript Delete a search history and all relevant transcripts and the saved search object
//@access Private

router.delete('/searchHistory/:hist_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get the remove index
    const removeIndex = profile.searchHistory
      .map(item => item.id)
      .indexOf(req.params.hist_id);
    //return res.json(profile);
    //delete from tveyes
    console.log('Remove index: ' + removeIndex);
    var SearchGUID = profile.searchHistory[removeIndex].SearchGUID;

    var deleteSavedSearchObj = await axios.post(
      `http://mmsapi.tveyes.com/SavedSearch/savedsearchproxy.aspx?partnerID=20581&Action=remove&searchguid=${SearchGUID}`
    );

    //open up receiver again
    var receivers = await Receiver.find();
    receivers = receivers[0];
    for (var i = 1; i <= 5; i++) {
      if (receivers[`${i}`] === SearchGUID) {
        receivers[`${i}`] = '';
      }
    }
    await Receiver.replaceOne({ _id: '5dd77184940e95aa26335982' }, receivers);

    //database clean up
    await Transcript.deleteMany({
      queryString: profile.searchHistory[removeIndex].SearchQuery
    });

    //delete from search history
    profile.searchHistory.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/searchHistory
//@descript Get user profile's searchHistory
//@access Private

router.get('/searchHistory/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile.searchHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/searchHistory/:entry_id
//@descript Get return single search entry based on search entry id
//@access Private

router.get('/searchHistory/:entry_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const entry = await profile.searchHistory.find(
      x => x._id == req.params.entry_id
    );
    if (!entry) {
      res.status(400).send('No search history entry found');
    }
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/profile/searchHistory
//@descript Add profile searchHistory
//@access Private

router.put('/searchHistory', auth, async (req, res) => {
  const { SearchQuery, SearchGUID, SearchDate } = req.body;
  console.log(SearchQuery + SearchGUID + SearchDate);
  const newHistory = {
    SearchQuery,
    SearchGUID,
    SearchDate
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.searchHistory.unshift(newHistory);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DEL api/profile/searchHistory/:hist_id
//@descript Delete a search history
//@access Private

// router.delete('/searchHistory/:hist_id', auth, async (req, res) => {
//   console.log('hello');
//   try {
//     const profile = await Profile.findOne({ user: req.user.id });
//     //Get the remove index
//     const removeIndex = profile.searchHistory
//       .map(item => item.id)
//       .indexOf(req.params.hist_id);

//     profile.searchHistory.splice(removeIndex, 1);
//     await profile.save();
//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
