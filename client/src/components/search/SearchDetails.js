import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import SearchDetailsTop from './SearchDetailsTop';
import SearchDetailsTranscript from './SearchDetailsTranscript';
import { getSearchEntryById, exportToExcel } from '../../actions/profile';

const SearchDetails = ({
  getSearchEntryById,
  exportToExcel,
  profile: { searchEntry, loading },
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
            onClick={() => exportToExcel(searchEntry)}
          >
            <i className='fas fa-file-export' /> Export Data
          </button>
          <div className='profile-grid my-1'>
            <SearchDetailsTop searchEntry={searchEntry} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Transcript Matches</h2>
              <hr />
              <br />
              {searchEntry.searchResults.length > 0 ? (
                <Fragment>
                  {searchEntry.searchResults.map(transcript => (
                    <SearchDetailsTranscript
                      key={transcript._id}
                      transcript={transcript}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No transcripts matched for your search</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

SearchDetails.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getSearchEntryById, exportToExcel }
)(SearchDetails);
