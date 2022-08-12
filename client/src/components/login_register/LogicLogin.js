import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actionAuth";
import { authState, resMessagesState } from "../../redux/store";
const LogicLogin = () => {
  // States And Functions (Logic)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(authState);
  const resMessageError = useSelector(resMessagesState);

  // check user login ? dont show login page else show login page
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  });

  // Values inputs fileds
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Inputs Fields
  const inputs = [
    {
      id: "1",
      name: "email",
      type: "email",
      placeholder: "Email",
      messageError: resMessageError.email,
    },
    {
      id: "2",
      name: "password",
      type: "password",
      placeholder: "password",
      messageError: resMessageError.password,
    },
  ];

  // handle Change  value user Data
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // handle Login user
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(values));
  };
  return {
    values,
    inputs,
    handleChange,
    handleLogin,
  };
};

export default LogicLogin;
