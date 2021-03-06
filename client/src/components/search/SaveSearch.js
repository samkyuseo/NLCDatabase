import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchHistory } from '../../actions/profile';
import { createSavedSearch, clearSearch } from '../../actions/search';

const SaveSearch = ({
  addSearchHistory,
  savedSearch: { SearchGUID, SearchQuery, SearchDate },
  searchString,
  clearSearch
}) => {
  useEffect(() => {}, [addSearchHistory, clearSearch]);
  {
    if (searchString !== null) {
      addSearchHistory({
        SearchQuery: SearchQuery,
        SearchDate: SearchDate,
        SearchGUID: SearchGUID
      });
    }
    clearSearch();
  }

  return (
    <div>
      <p className='lead'>
        Your search was made and added to your search history!
      </p>
    </div>
  );
};

SaveSearch.propTypes = {
  addSearchHistory: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchString: PropTypes.object.isRequired,
  transcripts: PropTypes.array.isRequired,
  savedSearch: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  transcripts: state.search.transcripts,
  savedSearch: state.search.savedSearch
});

export default connect(mapStateToProps, { addSearchHistory, clearSearch })(
  SaveSearch
);
