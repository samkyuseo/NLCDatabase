import {
  SEARCH_TRANSCRIPTS,
  SEARCH_ERROR,
  CLEAR_SEARCH,
  GET_TRANSCRIPT
} from '../actions/types';

const initialState = {
  searchString: null,
  transcripts: [],
  transcript: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload, extra } = action;

  switch (type) {
    case CLEAR_SEARCH:
      return {
        ...state,
        searchString: null,
        transcripts: [],
        loading: false
      };
    case SEARCH_TRANSCRIPTS:
      return {
        ...state,
        searchString: extra,
        transcripts: payload,
        loading: false
      };
    case GET_TRANSCRIPT:
      return {
        ...state,
        transcript: payload,
        loading: false
      };
    case SEARCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
