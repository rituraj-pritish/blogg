import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth:{isAuth, loading},
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuth && !loading ? (
        <Redirect to='/signin' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
