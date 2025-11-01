import React from "react";
import { Link } from "react-router-dom";
import "./CartIcon.css"; // เราจะสร้างไฟล์ CSS นี้

// 1. กำหนด interface ให้รับ itemCount (นี่คือส่วนที่แก้ error ครับ)
interface CartIconProps {
  itemCount: number;
}

// 2. รับ itemCount มาจาก props
const CartIcon: React.FC<CartIconProps> = ({ itemCount }) => {
  return (
    <Link to="/cart" className="cart-icon-container" aria-label="Shopping Cart">
      {/* 3. ใช้ SVG ใหม่ที่คุณส่งมา */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="cart-svg"
      >
        <path
          d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z"
          data-name="Shopping Cart"
        />
      </svg>

      {/* 4. แสดงตัวเลข (Badge) ถ้ามีของในตะกร้า (itemCount > 0) */}
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount > 9 ? "9+" : itemCount}</span>
      )}
    </Link>
  );
};

export default CartIcon;
