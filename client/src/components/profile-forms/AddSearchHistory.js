//this will most likely be used
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchHistory } from '../../actions/profile';

const AddSearchHistory = props => {
  return <div />;
};

AddSearchHistory.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { AddSearchHistory }
)(AddSearchHistory);
