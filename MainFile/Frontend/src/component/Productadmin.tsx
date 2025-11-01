import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

function ProductAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:3000/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const role = res.data.user?.role;
        console.log("Detected role:", role);

        if (role !== "admin") {
          alert("Access denied");
          navigate("/");
        } else {
          // โหลด products ได้เลย
          return axios.get("http://localhost:3000/products");
        }
      })
      .then((res) => {
        if (res) setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Session expired or server error");
        navigate("/");
      });
  }, [navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Panel - Manage Products</h1>

      <button
        onClick={() => navigate("/add-product")}
        style={{
          background: "#4caf50",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          marginBottom: "1rem",
        }}
      >
        ➕ Add Product
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td className="text-center">{p.name}</td>
              <td className="text-center border-gray-200 text-red-600">
                ฿{p.price}
              </td>
              <td className="img-right">
                <img
                  src={
                    p.image?.startsWith("/uploads/")
                      ? `http://localhost:3000${p.image}` // ถ้ามี /uploads/ แล้ว → ใช้ตรงๆ
                      : `http://localhost:3000/uploads/${p.image}` // ถ้ายังไม่มี → ต่อเพิ่ม
                  }
                  alt={p.name}
                  width="80"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductAdmin;
