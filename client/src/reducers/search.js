import { GET_TRANSCRIPTS, TRANSCRIPTS_ERROR } from '../actions/types';

//actions
//get transcripts
//create search results?
//update profile's search history after a search

const initialState = {
  searchEntry: [], //going to be empty at first since the user hasn't searched for anything,
  loading: true, //set to false once request is made
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TRANSCRIPTS:
      return {
        ...state,
        transcripts: payload,
        loading: false
      };
    case TRANSCRIPTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
