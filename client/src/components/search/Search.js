import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import TranscriptItem from './TranscriptItem';
import SavedSearchItem from './SavedSearchItem';
import { getCurrentProfile, addSearchHistory } from '../../actions/profile'; //this checks if user has made a profile yet.
import { clearSearch } from '../../actions/search'; //this checks if user has made a profile yet.
import SearchBar from './SearchBar';
import SaveSearch from './SaveSearch';
const Search = ({
  getCurrentProfile,
  clearSearch,
  profile: { profile, loading },
  search,
  search: { searchString, transcripts, savedSearch }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, clearSearch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {
        (window.onload = function() {
          //considering there aren't any hashes in the urls already
          if (!window.location.hash) {
            //setting window location
            window.location = window.location + '#loaded';
            //using reload() method to reload web page
            window.location.reload();
          }
        })
      }
      <h1 className='large text-primary'>Create a Saved Search</h1>
      {profile !== null ? (
        <Fragment>
          <SearchBar />
          {searchString === null ? (
            <Fragment>
              {' '}
              <p className='lead'>Enter to make a Saved Search</p>
            </Fragment>
          ) : search.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <SaveSearch savedSearch={savedSearch} />
              <div className='posts'>
                <SavedSearchItem savedSearch={savedSearch} />
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet set up a profile. Please some add some information
            to use the search function.
          </p>
          <Link to='create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchTranscripts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  search: state.search, //this prop type handles states related to searching
  profile: state.profile //this prop type is here to check if the user has a profile.
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  clearSearch,
  addSearchHistory
})(Search);

// import React, { Fragment, useEffect } from 'react'; //allows us to call get current profile as soon as it loads
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { getCurrentProfile } from '../../actions/profile';
// import { searchTranscripts } from '../../actions/search';
// import SearchBar from './SearchBar';
// import Spinner from '../layout/Spinner';

// const Search = ({
//   getCurrentProfile,
//   searchTranscripts,
//   search: { transcripts, loading },
//   profile: { profile }
// }) => {
//   useEffect(() => {
//     getCurrentProfile();
//   }, [getCurrentProfile]); //empty brackets because we only want to call it once
//   return loading && profile === null ? (
//     <Spinner />
//   ) : (
//     <Fragment>
//       <h1 className='large text-primary'>Search</h1>

//       {profile !== null ? (
//         <Fragment>
//           <SearchBar />
//         </Fragment>
//       ) : (
//         <Fragment>
//           <p>
//             You have not yet set up a profile. Please some add some information
//             to use the search function.
//           </p>
//           <Link to='create-profile' className='btn btn-primary my-1'>
//             Create Profile
//           </Link>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// Search.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   getTranscripts: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
//   transcripts: PropTypes.object.isRequired
// };

// //anything in the state within the reducer we will be able to bring into this component
// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile,
//   search: state.search
// });

// export default connect(
//   mapStateToProps,
//   { getCurrentProfile, searchTranscripts }
// )(Search); //bring in the get current profile action
