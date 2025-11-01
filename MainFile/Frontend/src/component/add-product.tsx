import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    if (!name || !price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", String(price));
      formData.append("description", description);

      if (imageFile) {
        formData.append("image", imageFile); // 👈 เพิ่มไฟล์รูปเข้าไป
      }

      await axios.post("http://localhost:3000/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");
      navigate("/productadmin");
    } catch (err: any) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <div>
          <label>Product Name *</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label>Price (฿) *</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? Number(e.target.value) : "")
            }
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className=" underline cursor-pointer"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            style={{ marginTop: "0.3rem" }}
          />
          {imageFile && (
            <div style={{ marginTop: "0.5rem" }}>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                width="100"
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            background: "#4caf50",
            color: "white",
            padding: "0.7rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ✅ Add Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/productadmin")}
          style={{
            background: "#ccc",
            color: "black",
            padding: "0.7rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          🔙 Back
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
