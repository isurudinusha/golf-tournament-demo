import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import "./styles.css";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  signInWithGoogle,
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAuthWithEmailAndPassword(username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGooglePopUp = async () => {
    const { user } = await signInWithGoogle();
    await createUserDocumentFromAuth(user);
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="singin-form ">
      <div className="title">Welcome Back</div>
      <div className="subtitle">Sign in to your account</div>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-container ic1">
          <input
            placeholder=""
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="input"
            id="username"
            required
          />
          <div className="cut"></div>
          <label className="iLabel" htmlFor="username">
            Username or Email
          </label>
        </div>

        <div className="input-container ic2">
          <input
            placeholder=""
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="input"
            id="password"
          />
          <div className="cut"></div>
          <label className="iLabel" htmlFor="password">
            Password
          </label>
        </div>

        <button className="submit" type="submit">
          Sign In
        </button>
        <button className="google" onClick={signInWithGooglePopUp}>
          <FaGoogle style={{ color: "#F43F5E", marginLeft: "10px" }} /> Sign in
          with Google
        </button>
      </form>
    </div>
  );
}

export default SignIn;
