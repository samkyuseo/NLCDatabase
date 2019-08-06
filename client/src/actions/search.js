import axios from 'axios'; //requests to backend
import setAlert from './alert';

import { GET_TRANSCRIPTS, GET_SEARCHENTRY, TRANSCRIPTS_ERROR } from './types';

//Get all transcripts
export const getAllTranscripts = () => async dispatch => {
  try {
    const res = await axios.get('api/transcripts');
    dispatch({
      type: GET_TRANSCRIPTS,
      payload: res.data
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

// //get SearchEntry by id

// export const getSearchEntryById = id => async dispatch => {
//   try {
//     const res = await axios.get(`api/profile/searchHistory/${id}`)
//     dispatch ({
//       type: GET_SEARCHENTRY,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: TRANSCRIPTS_ERROR,
//       payload: {
//         msg: err.response.statusText,
//         status: err.response.status
//       }
//     });
//   }
// }
