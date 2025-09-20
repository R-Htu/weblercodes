import { FaQuestion, FaSignOutAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../context/apiCommunication";
import { useAuth } from "../context/authContext";
import ProfileAvatar from "../../../components/ProfileAvatar";
import { useState } from "react";

const AuthNavigation = () => {
  const { sendJsonRequest } = useApi();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    sendJsonRequest("/Auth/Logout", "POST").then(() => {
      logout();
      navigate("/Users/Login");
    });
  };

  return (
    <div className="wb-home-auth-nav">
      {userInfo ? (
        <div className="dropdown">
          <button
            className="profile-button"
            onClick={() => setOpen(!open)}
          >
            <ProfileAvatar size={32} avatarImage={userInfo.avatarImage} />
          </button>

          {open && (
            <div className="dropdown-menu">
              <Link to="/Profile" className="dropdown-item name">
                <b>{userInfo.name}</b>
                <span className="sub">Go to profile</span>
              </Link>
              <hr />
              <Link
                to={`/Profile/${userInfo.id}?settings=true`}
                className="dropdown-item"
              >
                <FaGear /> Settings
              </Link>
              <button className="dropdown-item">
                <FaQuestion /> Help
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="login-buttons">
          <Link to="/Users/Login" className="btn">Log in</Link>
          <Link to="/Users/Register" className="btn">Register</Link>
        </div>
      )}
    </div>
  );
};

export default AuthNavigation;
