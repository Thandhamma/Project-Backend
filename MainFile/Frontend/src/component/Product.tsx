import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

function Product() {
  const [products, setProducts] = useState<Product[]>([]); // ✅ ใช้ type ที่กำหนดไว้

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:3000/products") // ✅ ระบุ type ของ response
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fef6fb",
        minHeight: "100vh",
        padding: "3rem 2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#ff6f91",
        }}
      >
        Our Bear Collection
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          justifyItems: "center",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "250px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <img
              src={
                product.image?.startsWith("/uploads/")
                  ? `http://localhost:3000${product.image}` // ถ้ามี /uploads/ แล้ว → ใช้ตรงๆ
                  : `http://localhost:3000/uploads/${product.image}` // ถ้ายังไม่มี → ต่อเพิ่ม
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "210px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
            <h3 style={{ marginTop: "1rem", color: "#333" }}>{product.name}</h3>
            <p style={{ color: "#ff4f7a", fontWeight: "bold" }}>
              ฿{product.price}
            </p>
            <Link
              to={`/product/${product._id}`}
              style={{
                background: "#ff6f91",
                color: "white",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                display: "inline-block",
                marginTop: "0.5rem",
              }}
            >
              View Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
