import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchHistory } from '../../actions/profile';

const SaveSearch = ({ addSearchHistory, searchString, transcripts }) => {
  return (
    <div>
      <button
        className='btn btn-danger'
        onClick={() => {
          addSearchHistory({
            searchString: searchString,
            searchResults: transcripts
          });
        }}
      >
        Save this search
      </button>
    </div>
  );
};

SaveSearch.propTypes = {
  addSearchHistory: PropTypes.func.isRequired,
  searchString: PropTypes.object.isRequired,
  transcripts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  transcripts: state.search.transcripts
});

export default connect(
  mapStateToProps,
  { addSearchHistory }
)(SaveSearch);
