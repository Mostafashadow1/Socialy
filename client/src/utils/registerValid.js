export const registerValid = ({
  fullname,
  username,
  email,
  password,
  confirmPassword,
}) => {
  const error = {};
  fullname = fullname.trim();
  if (!fullname) {
    error.fullname = "Please enter a fullname.";
  } else if (fullname.length < 8 || fullname.length > 22) {
    error.fullname = "Fullname must be 8-22 characters.";
  }
  if (!username) {
    error.username = "Please enter a username.";
  } else if (username.length < 8 || username.length > 25) {
    error.username = "Username must be  8-25 characters.";
  }

  if (!email) {
    error.email = "Please enter an email address.";
  } else if (!emailValidator(email)) {
    error.email = "Email is incorrect.";
  }
  if (!password) {
    error.password = "Please enter a password.";
  } else if (password.length < 6 || password.length > 30) {
    error.password = "Password must be 6-30 characters";
  } else if (password !== confirmPassword) {
    error.confirmPassword = "Confirm password did not match.";
  }

  return {
    error,
    errorLength: Object.keys(error).length,
  };
};
// Email validator
const emailValidator = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
