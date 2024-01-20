// import { validateEmail } from "../../utils/Email_Password_Validation";
import {validateEmail} from '../../../../utils/ImportantValidate';
export const UseProfileDetailEdit = (
  signupValues,
  setSignupValues,
  setStateError,
  stateError,
  setAlertVisible,
) => {
  if (!signupValues.accountType) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Account Type',
      errorBody: 'Please Select Account Type To Proceed',
    });

    setAlertVisible(true);

    return;
  }
  if (!signupValues.age) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing D.O.B',
      errorBody: 'Please Select D.O.B To Proceed',
    });

    setAlertVisible(true);

    return;
  }
  if (!signupValues.gender) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Gender',
      errorBody: 'Please Select Gender To Proceed',
    });

    setAlertVisible(true);

    return;
  }
  if (!signupValues.selectSport) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Sport',
      errorBody: 'Please Select Sport To Proceed',
    });

    setAlertVisible(true);

    return;
  }
  if (!signupValues.position) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Position',
      errorBody: 'Please Select Position To Proceed',
    });

    setAlertVisible(true);

    return;
  }

  return true;
};
