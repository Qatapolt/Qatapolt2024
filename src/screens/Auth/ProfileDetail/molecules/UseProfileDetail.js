// import { validateEmail } from "../../utils/Email_Password_Validation";
import {validateEmail} from '../../../../utils/ImportantValidate';
import moment from 'moment';

export const UseProfileDetail = (
  signupValues,
  setSignupValues,
  setStateError,
  stateError,
  setAlertVisible,
) => {
  const calculateDateOfBirth = age => {
    const currentDate = moment();
    const dateOfBirth = currentDate.subtract(age, 'years');
    return dateOfBirth.format('DD-MM-YYYY');
  };
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
  if (signupValues.age < 5) {
    const currentDate = new Date();
    const selectedDate = calculateDateOfBirth(signupValues.age);

    // Calculate the age difference in years
    const ageDifference =
      (currentDate - selectedDate) / (365 * 24 * 60 * 60 * 1000);

    // Check if the selected date is less than five years from the current date
    if (ageDifference < 5) {
      setStateError({
        ...stateError,
        errorHeader: 'Invalid Date',
        errorBody: 'Please Select correct D.O.B To Proceed',
      });

      setAlertVisible(true);

      return;
    }
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
  if (!signupValues.phone) {
    setStateError({
      ...stateError,
      errorHeader: 'Missing Phone Number',
      errorBody: 'Please Enter Phone Number To Proceed',
    });

    setAlertVisible(true);

    return;
  }

  return true;
};
