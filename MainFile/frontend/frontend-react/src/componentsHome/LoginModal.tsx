import React, { useState } from 'react';

// ✍️ สร้าง Interface สำหรับ Props ที่ Component นี้จะรับ
// ในที่นี้คือฟังก์ชันสำหรับปิด Modal
interface LoginModalProps {
    onClose: () => void;
}

// 💡 สร้างคอมโพเนนต์สำหรับไอคอน SVG เพื่อให้โค้ดหลักอ่านง่ายขึ้น
const IconHide = () => (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="icon w-5 h-5">
        <g><path d="M304.97266 60.011719C301.64345 59.975172 298.30561 60.017867 294.96094 60.138672C187.93101 64.004416 94.223965 145.76059 6.6503906 276.92188A40 40 0 0 0 0.4921875 296.11328A40 40 0 0 0 0.12695312 299.21094A40 40 0 0 0 0.82226562 305.09961A40 40 0 0 0 2.3222656 312.62891A40 40 0 0 0 2.9257812 313.93945A40 40 0 0 0 6.734375 322.21094C35.448585 365.21698 64.840816 402.78301 95.126953 434.16211L152.01367 377.27539C131.15224 355.76877 109.85224 330.01133 88.212891 299.50781C163.93506 192.80386 235.70134 142.33057 297.84766 140.08594C321.03713 139.24837 345.5035 144.82962 371.17969 158.10938L429.63086 99.658203C389.28095 74.112324 347.77391 60.481577 304.97266 60.011719zM506.57617 164.13477L450 220.71094C470.20947 242.16957 491.00555 268.20117 512.4082 299.62891C432.36032 417.12964 360.51926 461.30947 297.92969 459.04883C276.74748 458.28376 254.42556 451.76693 231.23242 439.47852L172.28711 498.42383C211.38229 523.18429 252.12675 537.44604 295.04297 538.99609C402.07287 542.86185 501.15072 465.95461 593.82422 321.61133A40 40 0 0 0 599.95898 296.71289A40 40 0 0 0 599.73242 294.32031A40 40 0 0 0 599.60938 293.48633A40 40 0 0 0 593.74219 277.52344C565.30627 233.23316 536.26259 195.34152 506.57617 164.13477zM300 180C234.08138 180 180 234.08138 180 300C180 314.63297 182.79619 328.62076 187.66406 341.625L241.15625 288.13281C245.81666 264.29004 264.29004 245.81666 288.13281 241.15625L341.625 187.66406C328.62076 182.79619 314.63297 180 300 180zM412.33594 258.375L358.84375 311.86719C354.18334 335.70996 335.70996 354.18334 311.86719 358.84375L258.375 412.33594C271.37924 417.20381 285.36703 420 300 420C365.91862 420 420 365.91862 420 300C420 285.36703 417.20381 271.37924 412.33594 258.375z" /><path d="M570,0A30,30 0 0 0 548.78711,8.7871094L8.7871094,548.78711a30,30 0 0 0 0,42.42578 30,30 0 0 0 42.4257816,0L591.21289,51.212891a30,30 0 0 0 0,-42.4257816A30,30 0 0 0 570,0Z" /></g>
    </svg>
);

const IconView = () => (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="icon w-5 h-5">
        <g><path d="M304.97266 60.011719C301.64345 59.975172 298.30563 60.017867 294.96094 60.138672C187.93081 64.004424 94.224141 145.76033 6.6503906 276.92188A40 40 0 0 0 0.4921875 296.11328A40 40 0 0 0 0.12695312 299.21094A40 40 0 0 0 0.82226562 305.09961A40 40 0 0 0 2.3222656 312.62891A40 40 0 0 0 2.9257812 313.93945A40 40 0 0 0 6.734375 322.21094C94.308126 453.37249 188.01285 535.13035 295.04297 538.99609C402.07309 542.86185 501.15054 465.95491 593.82422 321.61133A40 40 0 0 0 599.95898 296.71289A40 40 0 0 0 599.73242 294.32031A40 40 0 0 0 599.60938 293.48633A40 40 0 0 0 593.74219 277.52344C503.96456 137.69058 408.17803 61.144675 304.97266 60.011719zM297.84766 140.08594C360.4588 137.82452 432.32712 182.03757 512.4082 299.62891C432.36016 417.12988 360.5194 461.30947 297.92969 459.04883C235.76089 456.80339 163.96532 406.29087 88.212891 299.50781C163.93522 192.80364 235.70122 142.33057 297.84766 140.08594z" /><path d="m300,180c-65.91876,0-120,54.08124-120,120 0,65.91876 54.08124,120 120,120 65.91876,0 120,-54.08124 120,-120 0,-65.91876 -54.08124,-120 -120,-120z m0,60c33.49239,0 60,26.50761 60,60 0,33.49239 -26.50761,60 -60,60 -33.49239,0 -60,-26.50761 -60,-60 0,-33.49239 26.50761,-60 60,-60z" /></g>
    </svg>
);

function LoginModal({ onClose }: LoginModalProps) {
    // --- State Management ---
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // --- Event Handlers ---
    const handleLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // ป้องกันการ reload หน้าเว็บเมื่อกด submit
        console.log('Login attempt with:', { email, password });
        // TODO: เพิ่ม Logic การ Login จริง (เช่น ยิง API ไปยัง Backend)
        onClose(); // ปิด Modal หลังจากพยายาม Login
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // ปิด Modal เฉพาะเมื่อคลิกที่พื้นหลังสีดำ ไม่ใช่ที่ตัว Modal Content
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        // Modal Overlay
        <div
            onClick={handleOverlayClick}
            className="flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
        >
            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose} // 👈 เรียกใช้ฟังก์ชัน onClose ที่รับมาจาก props
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl leading-none font-semibold cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        className="w-full mb-3 p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password + View Toggle */}
                    <div className="relative mb-4">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'} // 👈 ควบคุม type ด้วย state
                            placeholder="Password"
                            className="w-full p-2 border rounded pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button" // 👈 สำคัญ: ป้องกันไม่ให้ button นี้ submit form
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)} // 👈 สลับค่า state
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                        >
                            {/* 🚀 ใช้ Conditional Rendering เพื่อแสดงไอคอนที่ถูกต้อง */}
                            {isPasswordVisible ? <IconView /> : <IconHide />}
                        </button>
                    </div>

                    <button
                        type="submit" // 👈 ทำให้ปุ่มนี้ submit form
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3 font-semibold"
                    >
                        Login
                    </button>
                </form>

                {/* Signup + Forgot Password */}
                <div className="flex justify-between text-sm mb-4">
                    <div className="text-blue-500 hover:underline cursor-pointer">Sign In</div>
                    <div className="text-blue-500 hover:underline cursor-pointer">Forget Password?</div>
                </div>

                {/* Social Login Buttons */}
                <div className="flex items-center justify-between space-x-2">
                    {/* Facebook Button (SVG code omitted for brevity) */}
                    <button className="w-1/2 bg-blue-800 text-white py-2 rounded hover:bg-blue-900 flex items-center justify-center gap-3.5 font-normal">
                        Facebook
                    </button>
                    {/* Google Button (SVG code omitted for brevity) */}
                    <button className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 font-normal">
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;