import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h2>Đã có lỗi xảy ra ở phân vùng này!</h2>
          <p>Vui lòng F5 hoặc thử lại sau.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
