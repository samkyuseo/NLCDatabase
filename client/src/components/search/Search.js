import React, { Fragment, useEffect } from 'react'; //allows us to call get current profile as soon as it loads
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import SearchActions from './SearchActions';
import Spinner from '../layout/Spinner';

const Search = ({ getCurrentProfile, auth, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []); //empty brackets because we only want to call it once
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Search</h1>

      {profile !== null ? (
        <Fragment>
          <SearchActions />
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet set up a profile. Please some add some information
            to use the search function.
          </p>
          <Link to='create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

//anything in the state within the reducer we will be able to bring into this component
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Search); //bring in the get current profile action
