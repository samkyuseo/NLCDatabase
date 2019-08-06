import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteSearchHistory } from '../../actions/profile';
import { connect } from 'react-redux';

const SearchHistoryItem = ({
  deleteSearchHistory,
  searchHistory: { _id, searchDate, searchString, searchResults }
}) => {
  return (
    <div className='profile bg-light'>
      <ul>
        <p>
          <strong>"{searchString}"</strong>
        </p>
        <li class='text-primary'>
          <i class='far fa-clock' /> Search Date:{' '}
          <Moment format='YYYY/MM/DD'>{searchDate}</Moment>
        </li>
        <li class='text-primary'>
          <i class='far fa-check-circle' /> Transcripts that Matched:{' '}
          {searchResults.length}
        </li>
      </ul>
      <ul>
        <Link to={`/profile/searchHistory/${_id}`} className='btn btn-primary'>
          More Details
        </Link>
        <button
          onClick={() => deleteSearchHistory(_id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </ul>
    </div>
  );
};

SearchHistoryItem.propTypes = {
  searchHistory: PropTypes.object.isRequired,
  deleteSearchHistory: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteSearchHistory }
)(SearchHistoryItem);

{
  /* <ul>
<div>
  <h4>You Searched: "Charitable Giving"</h4>
</div>
<li class="text-primary">
  <i class="fas fa-check"></i> Number of Hits: 100
</li>
<li class="text-primary">
  <i class="fas fa-check"></i> Total Viewership: 50,000
</li>

</ul>
<ul>
<a href="profile.html" class="btn btn-primary">View Details</a>
</ul> */
}
