import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../App/store";
// 1. Import 'Link' เข้ามา
import { Link } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#ffe4ec",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          color: "#d6336c",
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        ตะกร้าสินค้า 🧸
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999" }}>
            ยังไม่มีสินค้าในตะกร้า
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "1rem",
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div style={{ fontSize: "0.9rem", color: "#555" }}>
                  ฿{item.price} x {item.quantity}
                </div>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  style={{
                    background: "#eee",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  style={{
                    background: "#eee",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  style={{
                    background: "#ff6f91",
                    color: "white",
                    border: "none",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                  }}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <div
              style={{
                textAlign: "right",
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginTop: "1.5rem",
                color: "#d6336c",
              }}
            >
              ยอดรวม: ฿{total}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              {/* 2. เปลี่ยน <button> เป็น <Link> และเพิ่ม to="/checkout" */}
              <Link
                to="/Checkout"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "none", // 3. เพิ่ม กันขีดเส้นใต้
                }}
              >
                สั่งสินค้า
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ล้างรถเข็น
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
