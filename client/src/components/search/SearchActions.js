import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSearchHistory } from '../../actions/profile';

const SearchActions = ({ addSearchHistory }) => {
  const [formData, setFormData] = useState({
    searchString: null,
    searchDate: null,
    searchResults: null
  });

  const { searchString } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      searchDate: Date.now(),
      searchResults: 'www.scripts.com'
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSearchHistory(formData);
  };

  return (
    <Fragment>
      <div class='post-form'>
        <form class='form my-1' onSubmit={e => onSubmit(e)}>
          <input
            type='text'
            placeholder='Search'
            name='searchString'
            value={searchString}
            onChange={e => onChange(e)}
          />
          <input type='submit' class='btn btn-dark my-1' />
        </form>
      </div>
    </Fragment>
  );
};

SearchActions.propTypes = {
  addSearchHistory: PropTypes.func.isRequired
};

export default connect(
  null,
  { addSearchHistory }
)(SearchActions);
