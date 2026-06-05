import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Pages/Home.tsx";
import NotFound from "../Pages/NotFound";
import ProductDetail from "../Pages/ProductDetail.tsx";
import Login from "../Pages/Login.tsx";
import CartPage from "../Pages/CartPage";
import MainLayout from "../components/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProductManagement from "../Pages/ProductManagement.tsx";
import ProductCreatePage from "../Pages/ProductCreatePage.tsx";
import ProductUpdatePage from "../Pages/ProductUpdatePage.tsx";
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
            <ProductCreatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/update/:id",
        element: (
          <ProtectedRoute>
            <ProductUpdatePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "product/manage",
        element: <ProductManagement />,
      },
    ],
  },
]);
