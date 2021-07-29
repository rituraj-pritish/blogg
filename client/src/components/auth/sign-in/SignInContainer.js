import React, { useState, useRef, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import setAlert from 'src/utils/setAlert';
import formValidator from 'src/utils/formValidator';
import ComponentLoader from 'src/components/shared/ComponentLoader';
import Page from 'src/components/ui/Page';
import { StyledSocialAuth } from './SignIn.styles';

//dynamic imports
const SignInForm = lazy(() => import('./SignInForm'));
const SignInQuery = lazy(() => import('./SignInQuery'));
const AuthButtonContainer = lazy(() =>
  import('../auth-button/AuthButtonContainer')
);
const Logo = lazy(() => import('src/assets/Logo'));
const Div = lazy(() => import('../../ui/Div'));
const Text = lazy(() => import('../../ui/Text'));

const SignInContainer = ({ isAuth }) => {
  const [formData, setFormData] = useState({
    email: 'demo@demo.com',
    password: '123123'
  });
  const { email, password } = formData;

  const signInRef = useRef();

  if (isAuth) {
    return <Redirect to='/' />;
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: ''
    });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { isEmpty } = formValidator;
  const handleSubmit = e => {
    e.preventDefault();

    if (isEmpty(email, password)) {
      setAlert('All fields are required', 'danger');
      return;
    } else {
      signInRef.current.callSignInQuery(formData);
    }
  };

  return (
    <Page m='1rem auto' pb='0 !important'>
      <Suspense fallback={<ComponentLoader />}>
        <Div maxWidth='500px' m='0 auto' textAlign='center'>
          <Link to='/'>
            <Logo />
          </Link>

          <StyledSocialAuth>
            <AuthButtonContainer
              provider='google'
              buttonText='Sign In with Google'
              type='signin'
              signInRef={signInRef}
            />
            <AuthButtonContainer
              provider='facebook'
              buttonText='Sign In with Facebook'
              signInRef={signInRef}
              type='signin'
            />
          </StyledSocialAuth>

          <Text mt='2rem'>or</Text>
          <Text mt='1rem' mb='2rem' text>
            Sign in using email
          </Text>

          <SignInForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />

          <Div m='2rem 0'>
            New here ?{' '}
            <Text inline color='blue' style={{ textDecoration: 'underline' }}>
              <Link to='/signup'> Sign Up</Link>
            </Text>
          </Div>

          <SignInQuery ref={signInRef} resetForm={resetForm} />
        </Div>
      </Suspense>
    </Page>
  );
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth
});

export default connect(mapStateToProps)(SignInContainer);
