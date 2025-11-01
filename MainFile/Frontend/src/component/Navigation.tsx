import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import type { RootState } from "../../App/store";
import LoginModal from "./Login";
import ProfileDropdown from "./ProfileDropdown";

const cartLinkStyles: React.CSSProperties = {
  position: "relative",
  display: "inline-block",
  verticalAlign: "middle",
  margin: "0 5px",
};
const cartIconStyles: React.CSSProperties = {
  width: "30px",
  height: "30px",
  fill: "white",
  verticalAlign: "middle",
};
const cartBadgeStyles: React.CSSProperties = {
  position: "absolute",
  top: "-8px",
  right: "12px",
  backgroundColor: "orange",
  color: "white",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  fontWeight: "bold",
  border: "2px solid #eee",
};

const Navigation: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const onRegisterPage = location.pathname === "/register";

  const handleLoginSuccess = (token: string) => {
    login(token);
    setIsModalOpen(false);
  };

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="bg-pink-500 text-white p-4 sticky top-0 z-50">
        <ul className="flex space-x-6 container mx-auto items-center">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Product" className="hover:text-gray-200">
              Product
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">
              Contact
            </Link>
          </li>

          <li className="ml-auto flex space-x-5">
            <Link to="/cart" className="pr-5.5" style={cartLinkStyles}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={cartIconStyles}
              >
                <path d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" />
              </svg>
              {totalQuantity > 0 && (
                <span style={cartBadgeStyles}>{totalQuantity}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              !onRegisterPage && (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-pink-500 px-3 py-1 rounded hover:bg-gray-100 font-semibold cursor-pointer"
                  >
                    Login
                  </button>
                  <Link
                    to="/register"
                    className="bg-white text-pink-500 px-3 py-1 rounded hover:bg-gray-100 font-semibold"
                  >
                    Sign Up
                  </Link>
                </>
              )
            )}
          </li>
        </ul>
      </nav>

      {!onRegisterPage && (
        <LoginModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Navigation;
