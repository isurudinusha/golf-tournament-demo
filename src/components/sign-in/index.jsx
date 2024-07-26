import { UserContext } from "../../context/user.context";
import "./styles.css";
import { FaGoogle } from "react-icons/fa";

import {
  signInWithGoogle,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

function SignIn() {
  const signInWithGooglePopUp = async () => {
    const { user } = await signInWithGoogle();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div class="singin-form ">
      <div class="title">Welcome Back</div>
      <div class="subtitle">Sign in to your account</div>

      <div class="input-container ic1">
        <input placeholder="" type="text" class="input" id="username" />
        <div class="cut"></div>
        <label class="iLabel" for="username">
          Username or Email
        </label>
      </div>

      <div class="input-container ic2">
        <input placeholder="" type="password" class="input" id="password" />
        <div class="cut"></div>
        <label class="iLabel" for="password">
          Password
        </label>
      </div>

      <button class="submit" type="submit">
        Sign In
      </button>
      <button class="google" onClick={signInWithGooglePopUp}>
        <FaGoogle style={{ color: "#F43F5E", marginLeft: "10px" }} /> Sign in
        with Google
      </button>
    </div>
  );
}

export default SignIn;
