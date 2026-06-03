import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Pages/Home.tsx";
import NotFound from "../Pages/NotFound";
import ProductDetail from "../Pages/ProductDetail";
import Login from "../Pages/Login.tsx";
import CartPage from "../Pages/CartPage";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProductForm from "../Pages/ProductForm.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product/create",
        element: (
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
