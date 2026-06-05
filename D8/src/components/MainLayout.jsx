import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUIStore } from "../stores/ui.store";
import ErrorBoundary from "./ErrorBoundary";
import "../css/MainLayout.css";
const MainLayout = () => {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log("Đã khôi phục kết nối internet !");
    };
    const handleOffline = () => {
      setIsOnline(false);
      console.log("Bạn đang ở chế độ ngoại tuyến !");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div
      style={
        isDarkMode
          ? { color: "white", backgroundColor: "black" }
          : { color: "black", backgroundColor: "white" }
      }
    >
      {!isOnline && (
        <div className="internet-banner">
          ⚠️ Không có kết nối Internet. Vui lòng kiểm tra lại đường truyền mạng!
        </div>
      )}
      <Header />

      <main className="main-container">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
