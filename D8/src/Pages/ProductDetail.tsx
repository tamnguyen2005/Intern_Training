import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import getProduct from "../data/product";
import "../css/ProductDetail.css";
import { useEffect, useState } from "react";
import { Product } from "../types/product.type";
import { productService } from "../services/product.service";
import { useCartStore } from "../stores/cart.store";
import { useFetchById } from "../hooks/useFetchById";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { product, isLoading, error } = useFetchById(id!);
  if (isLoading) {
    return <h1>Sản phẩm đang được tải</h1>;
  }
  if (error) {
    return <h1>Có lỗi xảy ra ${error}</h1>;
  }
  if (!product) {
    return (
      <>
        <h2>Sản phẩm này không tồn tại hoặc đã bị xóa !</h2>
        <button onClick={() => navigate("/")}>Back</button>
      </>
    );
  }
  return (
    <div className="detail-container">
      <div className="detail-img">
        <img src={product.imageUrl} alt="" />
      </div>
      <div className="detail-cotent">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button
          onClick={() => {
            addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default ProductDetail;
