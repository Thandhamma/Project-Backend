import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Profile from './Profile';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
// Level 1 : RoutingApp (npm install react-router-dom @types/react-router-dom)
const RoutingApp: React.FC = () => {
    // 2. เปลี่ยน state นี้จาก boolean เป็น string (token)
    // เพื่อให้เรารู้ว่า login หรือยัง โดยการเช็คว่ามี token หรือไม่
    // เราอ่านจาก localStorage เผื่อผู้ใช้เคย login ค้างไว้
    const [token, setToken] = React.useState<string | null>(localStorage.getItem('token'));

    // 3. สร้างตัวแปร boolean จาก token (เพื่อให้โค้ดที่เหลือทำงานได้เหมือนเดิม)
    const isAuthenticated = !!token; // ถ้า token มีค่า = true, ถ้าเป็น null = false

    // state for modal open/close
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    // 4. แก้ไขฟังก์ชันนี้ให้รับ token ได้ (และเปลี่ยนชื่อ)
    const handleLoginSuccess = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // 5. บันทึก token ลง localStorage
        setIsModalOpen(false); // ปิด Modal
    };

    // 6. แก้ไขฟังก์ชัน Logout
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token'); // 7. ลบ token ออกจาก localStorage
    };

    
    return (
        <BrowserRouter>
            {/* 2.2.1) BrowserRouter */}
            <div className="min-h-screen bg-gray-100">

                {/* Nav Bar and Links */}
                <nav className="bg-blue-500 p-4">
                    <ul className="flex space-x-4">
                        {/* 2.3.4) Link */}
                        <li><Link to="/" className="text-white hover:underline">Home</Link></li>
                        <li><Link to="/product" className="text-white hover:underline">Product</Link></li>
                        <li><Link to="/about" className="text-white hover:underline">About</Link></li>
                        <li><Link to="/contact" className="text-white hover:underline">Contact</Link></li>
                        <li><Link to="/profile" className="text-white hover:underline">Profile</Link></li>
                       <li className="ml-auto flex space-x-4"> 
                            {isAuthenticated ? (
                                // ถ้า Login แล้ว: แสดงปุ่ม Log Out
                                <button
                                    onClick={handleLogout} // <-- ใช้ handleLogout ใหม่
                                    className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-200"
                                >
                                    Log Out
                                </button>
                            ) : (
                                // 9. ถ้ายังไม่ Login: แยกเป็น 2 ปุ่ม
                                <>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-white border border-gray-200 text-pink-500 font-semibold hover:bg-pink-200 hover:text-gray-700 transition duration-200"
                                    >
                                        <svg className="w-5 h-5 ...">...</svg>
                                        Login
                                    </button>
                                    
                                    <Link 
                                        to="/register" 
                                        className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-white border border-gray-200 text-pink-500 font-semibold hover:bg-pink-200 hover:text-gray-700 transition duration-200"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
                {/* Routes and Route Handling */}
                <div className="p-6">
                    {/* 2.2.2) Routes */}
                    <Routes>
                        {/* 2.2.3) Route and path */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>

            <Login 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onLoginSuccess={handleLoginSuccess} 
            />
        </BrowserRouter>
    );
};
// 3) Export
export default RoutingApp;