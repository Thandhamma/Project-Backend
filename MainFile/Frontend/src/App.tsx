import React, { useState } from 'react';
// 1. Import ทุกอย่างที่จำเป็น
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 2. Import หน้าต่างๆ (สังเกต path ที่ตรงกับโฟลเดอร์ของคุณ 'conponents')
import Home from './component/Home';
import About from './component/About';
// (ถ้าคุณแก้ชื่อไฟล์เป็น Contact.tsx ก็แก้ตรงนี้ด้วยครับ)
import Contact from './component/Contact';
//import Login from './conponents/Login';
import Login from './component/Login';
import Register from './component/Register';
import Product from './component/Product';

import { AuthProvider, useAuth } from './context/AuthContext';

// 3. Import CSS หลัก
import './index.css';
import type ProtectedRoute from './component/ProtectedRoute';
import type Profile from './component/Profile';




///3. สร้าง Component Navbar แยกออกมาเพื่อเรียกใช้ useAuth
const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // ดึงสถานะ Login มาเช็ค
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { login } = useAuth();

  const handleLoginSuccess = (token: string) => {
    login(token); // สั่ง Context ให้อัปเดต
    setIsModalOpen(false); // สั่งปิด Modal
  };

    return (
        <>
    <nav className="bg-pink-500 text-white p-4 sticky top-0 z-50">
      <ul className="flex space-x-6 container mx-auto">
        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
        <li><Link to="/product" className="hover:text-gray-200">Product</Link></li>
        <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
        <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        {/* <li><Link to="/profile" className="hover:text-gray-200">Profile</Link></li> */}
        
        {/* 4. ตรวจสอบสถานะ Login เพื่อเปลี่ยนปุ่ม */}
        <li className="ml-auto flex space-x-4">
          {isAuthenticated ? (
            // ถ้า Login แล้ว
            <button
              onClick={logout}
              className="bg-pink-700 px-3 py-1 rounded hover:bg-pink-800"
            >
              Logout
            </button>
          ) : (
            // ถ้ายังไม่ Login
            <>
              <button onClick={() => setIsModalOpen(true)} className="bg-white text-pink-500 px-3 py-1 rounded hover:bg-gray-100 font-semibold cursor-pointer">
                Login
              </button>
              <Link to="/register" className="bg-white text-pink-500 px-3 py-1 rounded hover:bg-gray-100 font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
    <Login
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess} // ส่งฟังก์ชันสำหรับจัดการ Login สำเร็จไป
      />
      </>
  );
};

                {/* 8. ส่วนที่เนื้อหาจะเปลี่ยนไปตาม URL */}
        const App: React.FC = () => {
            return (
                <AuthProvider>
                    <BrowserRouter>
                <div className="min-h-screen flex flex-col">
                    <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* <Route path="/product" element={<Product />} /> */} 
                    {/* <Route path="/login" element={<Login />} />  */}
                    <Route path="/register" element={<Register />} />
                    {/* <Route path="/profile" 
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                        />
                    */}
                </Routes>
                </div>
                </BrowserRouter>
                </AuthProvider>
            );
        }
// 9. Export
export default App;