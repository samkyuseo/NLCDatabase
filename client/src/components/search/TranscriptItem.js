import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux'; //for adding more actions for showing more details of the post

const TranscriptItem = ({
  transcript: { _id, programName, date, city, state, station, viewership }
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/transcripts/${_id}`} className='text-primary'>
        Program Name: {programName} <i class='fas fa-angle-double-right' />
      </Link>
      <p className='post-date'>Unique ID: {_id}</p>
      <p class='post-date'>City: {city}</p>
      <p class='post-date'>State: {state}</p>
      <p class='post-date'>Station: {station}</p>
      <p class='post-date'>
        Published: <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <p class='post-date'>Viewership: {viewership}</p>
    </div>
  </div>
);

TranscriptItem.propTypes = {
  transcript: PropTypes.object.isRequired
};

export default connect(
  null,
  {}
)(TranscriptItem);
