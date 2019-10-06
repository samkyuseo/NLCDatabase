import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_SEARCHENTRY,
  GET_MATCHED_TRANSCRIPTS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  searchEntry: null,
  matchedTranscripts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload, payload2 } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        searchHistory: [],
        loading: false
      };
    case GET_SEARCHENTRY:
      return {
        ...state,
        searchEntry: payload,
        matchedTranscripts: payload2,
        loading: false
      };
    case GET_MATCHED_TRANSCRIPTS:
      return {
        ...state,
        matchedTranscripts: payload,
        loading: false
      };
    default:
      return state;
  }
}
