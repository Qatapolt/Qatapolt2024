// import { validateEmail } from "../../utils/Email_Password_Validation";
import {validateEmail} from '../../../../utils/ImportantValidate';
export const UseVerified = (
  setState,
  state,
  setStateError,
  stateError,
  imageFile,
  setModalVisible,
) => {
  if (!state.name) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Name',
      errorBody: 'Please Enter Your Name For Account Verification',
    });
    // setStateError({
    //   ...stateError,
    //   errorBody: 'Please Enter Your Full Name To Proceed',
    // });
    setModalVisible(true);

    return;
  }
  if (!state.username) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Username',
      errorBody: 'Please Enter Your Username For Account Verification',
    });
    setModalVisible(true);

    return;
  }
  if (!state.email) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Email',
      errorBody: 'Please Enter Your Email For Account Verification',
    });

    setModalVisible(true);

    return;
  }

  if (!validateEmail(state.email)) {
    setStateError({
      ...stateError,
      errorHeader: 'Invalid Email',
      errorBody: 'Please Enter Your Valid Email For Account Verification',
    });

    setModalVisible(true);

    return;
  }
  //   name: '',
  //   username: '',
  //   email: '',
  //   message: '',
  //   phoneNumber:"",
  //   supporting:""

  if (!state.phoneNumber) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Phone Number',
      errorBody: 'Please Enter Your Phone Number For Account Verification',
    });

    setModalVisible(true);

    return;
  }

  if (!state.supporting) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Supporting',
      errorBody: 'Please Enter Your Supporting For Account Verification',
    });

    setModalVisible(true);

    return;
  }

  if (!state.descripation) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Descripation',
      errorBody: 'Please Enter Your Descripation For Account Verification',
    });

    setModalVisible(true);

    return;
  }
  if (!imageFile) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Identification',
      errorBody: 'Please Upload Identification For Account Verification',
    });

    setModalVisible(true);

    return;
  }

  return true;
};
