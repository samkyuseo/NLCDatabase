//actions
//get transcripts
//create search results?
//update profile's search history after a search

const initialState = {
  profile: null, //not null but we need to get the current user's profile.. also profile can't be null for a user to use this functionality
  transcripts: [], //going to be empty at first since the user hasn't searched for anything,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  }
}
