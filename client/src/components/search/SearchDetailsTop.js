import React from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';

const SearchDetailsTop = ({ searchEntry: { SearchQuery, SearchDate } }) => {
  return (
    <div class='profile-top'>
      <p class='lead text-primary'>
        {' '}
        <i class='fas fa-scroll' /> "{SearchQuery}" Search Results
      </p>
    </div>
  );
};

SearchDetailsTop.propTypes = {
  searchEntry: PropTypes.object.isRequired
};

export default SearchDetailsTop;
