import auth from '@react-native-firebase/auth';
export const Register = async (email, password) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email.trim(),
      password.trim(),
    );

    return response;

    // .then(r => {
    //     auth()
    //       .currentUser.sendEmailVerification({
    //         handleCodeInApp: true,
    //         url: 'https://qatapolt-2023.firebaseapp.com',

    //       })
    //       .then(() => {
    //         alert('Email verification is send');
    //       })
    //       .catch(error => {
    //         alert(error.message);
    //       });
  } catch (error) {
    throw error;
  }
};


export const Login = async (email, password) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        email.trim(),
        password.trim(),
      );
  
      return response;
  
      // .then(r => {
      //     auth()
      //       .currentUser.sendEmailVerification({
      //         handleCodeInApp: true,
      //         url: 'https://qatapolt-2023.firebaseapp.com',
  
      //       })
      //       .then(() => {
      //         alert('Email verification is send');
      //       })
      //       .catch(error => {
      //         alert(error.message);
      //       });
    } catch (error) {
      throw error;
    }
  };
