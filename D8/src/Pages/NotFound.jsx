import { Link } from "react-router-dom";
import "../css/NotFound.css";
const NotFound = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Quay về trang chủ</Link>
    </div>
  );
};
export default NotFound;
