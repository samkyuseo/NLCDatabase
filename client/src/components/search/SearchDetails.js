import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import SearchDetailsTop from './SearchDetailsTop';
import SearchDetailsTranscript from './SearchDetailsTranscript';
import { exportToExcel } from '../../actions/profile';
import { getSearchEntryById } from '../../actions/search';
//import { getMatchedTranscripts } from '../../actions/search';

const SearchDetails = ({
  getSearchEntryById,
  getMatchedTranscripts,
  exportToExcel,
  profile: { searchEntry, loading, matchedTranscripts },
  match
}) => {
  useEffect(() => {
    getSearchEntryById(match.params.id);
  }, [getSearchEntryById]);
  return (
    <Fragment>
      {searchEntry === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/dashboard' className='btn btn light'>
            <i className='fas fa-backward' /> Back To Dashboard
          </Link>
          <button
            className='btn btn-primary'
            onClick={() => exportToExcel(searchEntry, matchedTranscripts)}
          >
            <i className='fas fa-file-export' /> Export Data
          </button>
          <div className='profile-grid my-1'>
            <SearchDetailsTop searchEntry={searchEntry} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Transcript Matches</h2>
              <hr />
              <br />
              {matchedTranscripts.length > 0 ? (
                <Fragment>
                  {matchedTranscripts.map(transcript => (
                    <SearchDetailsTranscript
                      key={transcript._id}
                      transcript={transcript}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No transcripts matched for your search</h4>
              )}
              <Fragment>
                {/* <SearchDetailsTranscript
                  SearchQuery={searchEntry.SearchQuery}
                /> */}
              </Fragment>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

SearchDetails.propTypes = {
  getSearchEntryById: PropTypes.func.isRequired,
  //getMatchedTranscripts: PropTypes.func.isRequired,

  searchEntry: PropTypes.object.isRequired,
  matchedTranscripts: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getSearchEntryById, exportToExcel }
)(SearchDetails);
