// import { validateEmail } from "../../utils/Email_Password_Validation";
import {validateEmail} from '../../../../utils/ImportantValidate';
export const UseSignup = (
    setState, state, setStateError,stateError,setModalVisible

) => {

  if (!state.name) {
    setStateError({...stateError, errorHeader: 'Missing Name',errorBody:"Please Enter Your Name To Proceed"});
    // setStateError({
    //   ...stateError,
    //   errorBody: 'Please Enter Your Full Name To Proceed',
    // });
    setModalVisible(true);

    return;
  }
  if (!state.username) {
    setStateError({...stateError, errorHeader: 'Missing Username',errorBody: 'Please Enter Your Username To Proceed'});
    setModalVisible(true);

    return;
  }
  if (!state.email) {
    setStateError({...stateError, errorHeader: 'Missing Email',errorBody: 'Please Enter Your Email To Proceed'});
  
    setModalVisible(true);

    return;
  }

  if (!validateEmail(state.email)) {
    setStateError({...stateError, errorHeader: 'Invalid Email',  errorBody: 'Please Enter Your Valid Email To Proceed'});
 
    setModalVisible(true);

    return;
  }
  if (!state.password) {
    setStateError({...stateError, errorHeader: 'Missing Password',errorBody: 'Please Enter Your Password To Proceed'});
   
    setModalVisible(true);

    return;
  }
  if (state.password.length < 6) {
    setStateError({...stateError, errorHeader: 'Invalid Password',errorBody: 'Your Password Must Be At Least 6 Characters'});
  
    setModalVisible(true);

    return;
  }
  if (!state.confirmPassword) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing ConFirm Password',
      errorBody: 'Please Enter Your Confirm Password To Proceed',

    });
 
    setModalVisible(true);

    return;
  }
  if (state.confirmPassword != state.password) {
    setStateError({
      ...stateError,
      errorHeader: 'Invalid ConFirm Password',
      errorBody: 'Confirm Password Not Matched',

    });
   
    setModalVisible(true);

    return;
  }

  return true;
};
