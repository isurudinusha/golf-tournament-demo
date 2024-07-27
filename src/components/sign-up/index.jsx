import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./styles.css";

function SignUp() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName: username });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <div className="title">Welcome</div>
      <div className="subtitle">Create your account!</div>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-container ic1">
          <input
            id="username"
            name="username"
            onChange={handleChange}
            className="input"
            type="text"
            placeholder=" "
            required
            value={username}
          />
          <div className="cut"></div>
          <label htmlFor="username" className="iLabel">
            Username
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="email"
            className="input"
            type="text"
            placeholder=" "
            name="email"
            onChange={handleChange}
            required
            value={email}
          />
          <div className="cut cut-short"></div>
          <label htmlFor="email" className="iLabel">
            Email
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="password"
            className="input"
            type="password"
            placeholder=" "
            name="password"
            onChange={handleChange}
            required
            value={password}
          />
          <div className="cut"></div>
          <label htmlFor="password" className="iLabel">
            Password
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="confirm-password"
            className="input"
            type="password"
            placeholder=" "
            name="confirmPassword"
            onChange={handleChange}
            required
            value={confirmPassword}
          />
          <div className="cut cut-long"></div>
          <label htmlFor="confirm-password" className="iLabel">
            Confirm Password
          </label>
        </div>
        <button type="text" className="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
