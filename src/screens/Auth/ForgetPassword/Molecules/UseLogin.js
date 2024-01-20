import {validateEmail} from '../../../../utils/ImportantValidate';

export const UseLogin = (state, stateError, setStateError, setModalVisible) => {
  if (!state.email) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Email',
      errorBody: 'Please Enter Your Email To Proceed',
    });

    setModalVisible(true);
    return;
  }
  if (!validateEmail(state.email)) {
    setStateError({
      ...stateError,
      errorHeader: 'Invalid Email',
      errorBody: 'Please Enter Your Valid Email To Proceed',
    });

    setModalVisible(true);

    return;
  }

  return true;
};
