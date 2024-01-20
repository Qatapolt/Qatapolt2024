// import { validateEmail } from "../../utils/Email_Password_Validation";
import {validateEmail} from '../../../../utils/ImportantValidate';
export const UseContact = (
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
  if (!state.message) {
    setStateError({...stateError, errorHeader: 'Missing Message',errorBody: 'Please Enter Your Message To Proceed'});
   
    setModalVisible(true);

    return;
  }


  return true;
};
