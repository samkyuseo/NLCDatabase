import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTranscript } from '../../actions/search';
import Moment from 'react-moment';
const Transcript = ({
  getTranscript,
  search: { transcript, loading },
  match
}) => {
  useEffect(() => {
    getTranscript(match.params.id);
  }, [getTranscript]);
  return loading === true ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/search' className='btn'>
        Back To Search
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <h3 className='text-primary my-1'>{transcript.programName}</h3>
          <p>
            <strong>Published On: </strong>
            <Moment format='YYYY/MM/DD'>{transcript.date}</Moment>
          </p>
          <p>
            <strong>Location: </strong> {transcript.city}, {transcript.state}
          </p>
          <p>
            <strong>Station: </strong> {transcript.station}
          </p>
          <p>
            <strong>Viewership: </strong> {transcript.viewership}
          </p>
          <p>
            <strong>Total Viewership: </strong> {transcript.totalViewership}
          </p>
          <p>
            <strong>Full Text: </strong> {transcript.fullText}
          </p>
          <p>
            <br />
            <strong>
              <a href={transcript.videoLink}>Link to video</a>
            </strong>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Transcript.propTypes = {
  getTranscript: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  search: state.search
});
export default connect(
  mapStateToProps,
  { getTranscript }
)(Transcript);
