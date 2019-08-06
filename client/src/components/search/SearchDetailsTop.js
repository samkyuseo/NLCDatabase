import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const SearchDetailsTop = ({ searchEntry: { searchString, searchDate } }) => {
  return (
    <div class='profile-top'>
      <p class='lead text-primary'>
        {' '}
        <i class='fas fa-scroll' /> "{searchString}" Search Results
      </p>
    </div>
  );
};

SearchDetailsTop.propTypes = {
  searchEntry: PropTypes.object.isRequired
};

export default SearchDetailsTop;
