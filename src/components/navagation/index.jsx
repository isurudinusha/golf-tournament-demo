import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { Link, Outlet } from "react-router-dom";
import {
  getUserDocumentFromAuth,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import "./styles.css";

function Navagation() {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userData = await getUserDocumentFromAuth(currentUser.uid);
        setUser(userData);
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <>
      <div className="navagation-container">
        <div className="logo-container">
          <img srcSet="favicon.png" alt="" />
          <strong>GOLF</strong>
        </div>
        <div className="nav-links-container">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-buttons-container">
          {user && currentUser ? (
            <>
              <span>{`${user.displayName}`}</span>

              <button onClick={signOutUser}>Logout</button>
            </>
          ) : (
            <Link to="auth">
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navagation;
