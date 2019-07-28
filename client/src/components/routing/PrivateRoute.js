// same as regular route but render prop checks if its authenticated and loading
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //allows interacting with auth state in our auth reducer

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest //rest operator takes anything else passed in
}) => (
  <Route
    {...rest}
    //if its not authenticated and not loading then redirect to the login page, else load with what ever component thats passed in
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

//just need the auth state to pull in all state in the auth reducer
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute); //in any componennt with connect we want to export with connect
