import "./styles.css";
import { Link, Outlet } from "react-router-dom";

function Navagation() {
  return (
    <>
      <div className="navagation-container">
        <div className="logo-container">
          <img src="favicon.png" alt="" srcset="" />
          <strong>GOLF</strong>
        </div>
        <div className="nav-links-container">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-buttons-container">
          <Link to="auth">
            <button>Login</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navagation;
