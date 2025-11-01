import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

// (รูป Profile icon Placeholder)
const UserIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth(); // 1. ดึง 'logout' มาจาก Context
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 2. Hook สำหรับ "คลิกข้างนอก" (เพื่อให้เมนูปิดเอง)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 3. นี่คือปุ่ม Profile (วงกลม) ที่ใช้กดเปิด/ปิด */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-pink-500 hover:bg-gray-200 focus:outline-none"
      >
        <UserIcon />
      </button>

      {/* 4. นี่คือ "เมนู" ที่จะโผล่ออกมา */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <ul className="py-1">
            {/* 5. ลิงก์ไปหน้า Profile */}
            <li>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)} // สั่งปิดเมนูเมื่อคลิก
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Setting Profile
              </Link>
            </li>
            {/* 6. ปุ่ม Logout */}
            <li>
              <button
                onClick={() => {
                  logout(); // เรียก logout จาก Context
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
