import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import LoginForm from "../Forms/LoginForm";
import RegisterForm from "../Forms/RegisterForm";
import classes from "./Navbar.module.css";
import NavLinks from "./NavLinks";

const Navbar = (props) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const policy = useSelector((state) => state.auth.policy);
  const dispatch = useDispatch();

  const [logInShown, setLogInShown] = useState(false);
  const [registerShown, setRegisterShown] = useState(false);
  const [userName, setUserName] = useState();

  const showLoginHandler = () => {
    setLogInShown(true);
  };

  const hideLoginHandler = () => {
    setLogInShown(false);
  };

  const showRegisterHandler = () => {
    setRegisterShown(true);
  };

  const hideRegisterHandler = () => {
    setRegisterShown(false);
  };

  const loginHandler = (props) => {
    const userLoggedIn = [...props];
    setUserName(userLoggedIn[0].fullname.split(" ")[0]);
  };

  const logOut = () => {
    dispatch(authActions.logOut());
  };

  useEffect(() => {}, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {logInShown && (
        <LoginForm onClose={hideLoginHandler} onLogin={loginHandler} />
      )}
      {registerShown && <RegisterForm onClose={hideRegisterHandler} />}
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <i className="bi bi-building"></i>&nbsp; 302-Hotels
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLinks
              loggedIn={loggedIn}
              logOut={logOut}
              userName={userName}
              showLoginHandler={showLoginHandler}
              showRegisterHandler={showRegisterHandler}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
