import { NavLink, useOutletContext } from "react-router-dom";
import "../css/Header.css";
const Header = ({ totalItem }) => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <NavLink to="/">🛒 My Shop</NavLink>
        </div>
        <div className="header-link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/cart"
          >
            Cart {totalItem}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
export default Header;
