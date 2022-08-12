import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/actionAuth";
import { authState, resMessagesState } from "../../redux/store";
const LogicRegister = () => {
  // States And Functions

  const auth = useSelector(authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) navigate("/");
  });
  const resMessagesError = useSelector(resMessagesState);
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: "1",
      name: "fullname",
      type: "text",
      placeholder: "Fullname",
      messageError: resMessagesError.fullname,
    },
    {
      id: "2",
      name: "username",
      type: "text",
      placeholder: "username",
      messageError: resMessagesError.username,
    },
    {
      id: "3",
      name: "email",
      type: "email",
      placeholder: "Email",
      messageError: resMessagesError.email,
    },
    {
      id: "4",
      name: "password",
      type: "password",
      placeholder: "Password",
      messageError: resMessagesError.password,
    },
    {
      id: "5",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confrim Password",
      messageError: resMessagesError.confirmPassword,
    },
  ];
  // handle Change user Data
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  // handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(values));
  };
  return {
    inputs,
    values,
    handleChange,
    handleRegister,
  };
};

export default LogicRegister;
