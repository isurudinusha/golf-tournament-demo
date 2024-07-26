import SignIn from "../../components/sign-in";
import SignUp from "../../components/sign-up";
import "./styles.css";

function Auth() {
  return (
    <div className="auth-container">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Auth;
