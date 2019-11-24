import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchHistory } from '../../actions/profile';
import { createSavedSearch } from '../../actions/search';

const SaveSearch = ({
  addSearchHistory,
  savedSearch: { SearchGUID, SearchQuery, SearchDate },
  searchString
}) => {
  return (
    <div>
      <button
        className='btn btn-danger'
        onClick={() => {
          console.log(SearchGUID);
          addSearchHistory({
            SearchQuery: SearchQuery,
            SearchDate: SearchDate,
            SearchGUID: SearchGUID
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
  transcripts: PropTypes.array.isRequired,
  savedSearch: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  transcripts: state.search.transcripts,
  savedSearch: state.search.savedSearch
});

export default connect(mapStateToProps, { addSearchHistory })(SaveSearch);
