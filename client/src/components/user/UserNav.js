import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserNav = () => {
  let { user } = useSelector((state) => ({ ...state }));
  return (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/history" className="nav-link">
            History
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/password" className="nav-link">
            Password
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/user/wishlist" className="nav-link">
            Wishlist
          </Link>
        </li>

        {user && user.role === "admin" && (
          <>
            <hr />
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                Admin Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default UserNav;
