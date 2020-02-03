import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';

import {
  signUpMutation,
  socialSignUpMutation
} from '../../../graphql/mutations/userMutations';
import {
  setAlert,
  authError,
  authSuccess
} from '../../../redux/actions/userActions';

const SignUpQuery = (props, ref) => {
  const { resetForm, setAlert, authSuccess, authError } = props;
  const [signUp, { loading, error, data }] = useMutation(signUpMutation);
  const [
    socialSignUp,
    { loading: socialLoading, error: socialError, data: socialData }
  ] = useMutation(socialSignUpMutation);

  useEffect(() => {
    if (error) {
      setAlert(error.graphQLErrors[0].message, 'danger');
      authError();
    }

    if (socialError) {
      setAlert(socialError.graphQLErrors[0].message, 'danger');
      authError();
    }

    if (data && data.signUp) {
      resetForm();
      authSuccess(data.signUp);
      setAlert('Sign Up Successful', 'success');
    }

    if (socialData && socialData.socialSignUp) {
      authSuccess(socialData.socialSignUp);
      setAlert('Sign Up Successful', 'success');
    }
  }, [loading, error, data, socialLoading, socialError, socialData]);

  useImperativeHandle(ref, () => ({
    callSignUpMutation(data) {
      signUp({ variables: data });
    },

    callSocialSignUpMutation(data) {
      socialSignUp({ variables: data });
    }
  }));

  if (loading || socialLoading) return <div style={{color: 'orange', fontSize: '3rem'}}>SPINNER</div>;

  //todo loader/spinner if necessary
  return null;
};

export default connect(null, { setAlert, authError, authSuccess }, null, {
  forwardRef: true
})(forwardRef(SignUpQuery));