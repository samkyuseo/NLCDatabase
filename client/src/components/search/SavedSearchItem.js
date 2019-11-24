import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux'; //for adding more actions for showing more details of the post

const SavedSearchItem = ({
  savedSearch: { SearchGUID, SearchQuery, SearchDate }
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <p className='text-primary'>Query: {SearchQuery}</p>
      <p className='post-date'>SearchGUID: {SearchGUID}</p>
      <p class='post-date'>
        Published: <Moment format='YYYY/MM/DD'>{SearchDate}</Moment>
      </p>
    </div>
  </div>
);

SavedSearchItem.propTypes = {
  savedSearch: PropTypes.object.isRequired
};

export default connect(null, {})(SavedSearchItem);
