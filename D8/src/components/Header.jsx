import { NavLink, useOutletContext } from "react-router-dom";
import "../css/Header.css";
import { useCartStore } from "../stores/cart.store";
import { useAuthStore } from "../stores/auth.store";
import { useUIStore } from "../stores/ui.store";
const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const totalItem = useCartStore((state) =>
    state.item.reduce((total, item) => total + item.quantity, 0),
  );
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <NavLink to="/">🛒 My Shop</NavLink>
          <button onClick={toggleDarkMode}>{isDarkMode ? "🌙" : "☀️"}</button>
        </div>
        <div className="header-link">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/cart"
          >
            Cart {totalItem}
          </NavLink>
          <NavLink
            to="/product/create"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Create Product
          </NavLink>
          {isAuthenticated ? (
            <div>
              <span>Xin chào {user.name}</span>
              <button onClick={logout}>Đăng xuất</button>
            </div>
          ) : (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
