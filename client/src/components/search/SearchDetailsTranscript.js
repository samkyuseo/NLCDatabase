import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const SearchDetailsTranscript = ({
  transcript: {
    programName,
    date,
    city,
    state,
    station,
    fullText,
    videoLink,
    viewership,
    totalViewership
  }
}) => (
  <div>
    <h3 className='text-dark'>{programName}</h3>
    <p>
      <strong>Published On: </strong>
      <Moment format='YYYY/MM/DD'>{date}</Moment>
    </p>
    <p>
      <strong>Location: </strong> {city}, {state}
    </p>
    <p>
      <strong>Station: </strong> {station}
    </p>
    <p>
      <strong>Viewership: </strong> {viewership}
    </p>
    <p>
      <strong>Total Viewership: </strong> {totalViewership}
    </p>
    <p>
      <strong>Full Text: </strong> {fullText}
    </p>
    <p>
      <strong>
        <a href={videoLink}>Link to video</a>
      </strong>
    </p>
  </div>
);

SearchDetailsTranscript.propTypes = {
  transcript: PropTypes.array.isRequired
};

export default SearchDetailsTranscript;
