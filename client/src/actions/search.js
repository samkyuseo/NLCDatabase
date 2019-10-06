import axios from 'axios'; //requests to backend
// import setAlert from './alert';

import {
  SEARCH_TRANSCRIPTS,
  SEARCH_ERROR,
  CLEAR_SEARCH,
  GET_TRANSCRIPT,
  CREATE_SAVEDSEARCH,
  GET_SEARCHENTRY,
  TRANSCRIPTS_ERROR,
  GET_MATCHED_TRANSCRIPTS
} from './types';

//Create saved search object
export const createSavedSearch = searchString => async dispatch => {
  try {
    const res = await axios.post(`api/transcripts/query/${searchString}`);
    dispatch({
      type: CREATE_SAVEDSEARCH,
      payload: res.data,
      extra: searchString
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
//search transcripts
export const searchTranscripts = searchString => async dispatch => {
  try {
    const res = await axios.get('api/transcripts');

    dispatch({
      type: SEARCH_TRANSCRIPTS,
      extra: searchString,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//clear search string
export const clearSearch = () => async dispatch => {
  dispatch({
    type: CLEAR_SEARCH
  });
};

//get transcript by id
export const getTranscript = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transcripts/${id}`);
    dispatch({
      type: GET_TRANSCRIPT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//get SearchEntry by id

export const getSearchEntryById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/searchHistory/${id}`);
    console.log(res.data);
    const SearchQuery = res.data.SearchQuery;
    const res2 = await axios.get(
      `/api/transcripts/findmatches/${SearchQuery.replace(
        'Page.BroadcastMetadata.Market.Country:US',
        ''
      )}`
    );
    console.log(res2.data);
    dispatch({
      type: GET_SEARCHENTRY,
      payload: res.data,
      payload2: res2.data
    });
  } catch (err) {
    dispatch({
      type: TRANSCRIPTS_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
