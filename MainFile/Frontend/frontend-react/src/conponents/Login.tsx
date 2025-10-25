import React, { useState } from "react";

const Login: React.FC = () => {
    // State สำหรับจัดการการเปิด/ปิด Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State สำหรับสลับการแสดงรหัสผ่าน
    const [showPassword, setShowPassword] = useState(false);

    // State สำหรับเก็บค่าในฟอร์ม
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ฟังก์ชันเปิด Modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // ฟังก์ชันปิด Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // ฟังก์ชันสลับการแสดงรหัสผ่าน
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // สลับค่า true/false
    };

    // ฟังก์ชันจัดการการ Submit ฟอร์ม
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // ป้องกันหน้าเว็บโหลดใหม่
        console.log("Login attempt with:", { email, password });
        // TODO: เพิ่ม Logic การ Login จริงที่นี่
        // เช่น: await auth.signInWithEmail(email, password);
        // handleCloseModal(); // ปิด Modal เมื่อ Login สำเร็จ
    };

    return (
        <>
            {/* =================================== */}
            {/* ==      ปุ่มสำหรับเปิด Modal       == */}
            {/* =================================== */}
            <button
                type="button"
                onClick={handleOpenModal} // เปลี่ยนจาก label มาใช้ button และ onClick
                className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-white border border-gray-200 text-pink-500 font-semibold hover:bg-pink-200 hover:text-gray-700 transition duration-200"
            >
                {/* Profile SVG Placeholder */}
                <svg
                    className="w-5 h-5 text-pink-500 group-hover:text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                </svg>
                Login / Register
            </button>

            {/* =================================== */}
            {/* ==        ตัว Modal Login        == */}
            {/* =================================== */}
            {/* ใช้ Conditional Rendering ของ React แทน peer-checked */}
            {isModalOpen && (
                <div className="flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* ❌ Close Button */}
                        <button
                            type="button"
                            onClick={handleCloseModal} // เปลี่ยนจาก label มาใช้ button และ onClick
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl cursor-pointer"
                        >
                            &times;
                        </button>
                        {/* ✅ Modal Content (หุ้มด้วย Form) */}
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                            <input
                                type="text"
                                placeholder="Email or Username"
                                className="w-full mb-3 p-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            {/* ✅ Password + View Toggle */}
                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"} // ควบคุม type ด้วย state
                                    id="password"
                                    placeholder="Password"
                                    className="w-full p-2 border rounded pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility} // ใช้ React onClick
                                    className="absolute right-2 top-2 text-sm text-gray-500 hover:text-blue-500"
                                >
                                    {/* สลับไอคอนด้วย Conditional Rendering */}
                                    {showPassword ? (
                                        <svg
                                            className="icon w-5 h-5"
                                            id="icon-view"
                                            viewBox="0 0 600 600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                        >
                                            <g>
                                                <path d="M304.97266 60.011719C301.64345 59.975172 298.30563 60.017867 294.96094 60.138672C187.93081 64.004424 94.224141 145.76033 6.6503906 276.92188A40 40 0 0 0 0.4921875 296.11328A40 40 0 0 0 0.12695312 299.21094A40 40 0 0 0 0.82226562 305.09961A40 40 0 0 0 2.3222656 312.62891A40 40 0 0 0 2.9257812 313.93945A40 40 0 0 0 6.734375 322.21094C94.308126 453.37249 188.01285 535.13035 295.04297 538.99609C402.07309 542.86185 501.15054 465.95491 593.82422 321.61133A40 40 0 0 0 599.95898 296.71289A40 40 0 0 0 599.73242 294.32031A40 40 0 0 0 599.60938 293.48633A40 40 0 0 0 593.74219 277.52344C503.96456 137.69058 408.17803 61.144675 304.97266 60.011719zM297.84766 140.08594C360.4588 137.82452 432.32712 182.03757 512.4082 299.62891C432.36016 417.12988 360.5194 461.30947 297.92969 459.04883C235.76089 456.80339 163.96532 406.29087 88.212891 299.50781C163.93522 192.80364 235.70122 142.33057 297.84766 140.08594z"></path>
                                                <path d="m300,180c-65.91876,0-120,54.08124-120,120 0,65.91876 54.08124,120 120,120 65.91876,0 120,-54.08124 120,-120 0,-65.91876 -54.08124,-120 -120,-120z m0,60c33.49239,0 60,26.50761 60,60 0,33.49239 -26.50761,60 -60,60 -33.49239,0 -60,-26.50761 -60,-60 0,-33.49239 26.50761,-60 60,-60z"></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg
                                            id="icon-hide"
                                            viewBox="0 0 600 600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                            className="icon w-5 h-5"
                                            aria-hidden="true"
                                        >
                                            <g>
                                                <path d="M304.97266 60.011719C301.64345 59.975172 298.30561 60.017867 294.96094 60.138672C187.93101 64.004416 94.223965 145.76059 6.6503906 276.92188A40 40 0 0 0 0.4921875 296.11328A40 40 0 0 0 0.12695312 299.21094A40 40 0 0 0 0.82226562 305.09961A40 40 0 0 0 2.3222656 312.62891A40 40 0 0 0 2.9257812 313.93945A40 40 0 0 0 6.734375 322.21094C35.448585 365.21698 64.840816 402.78301 95.126953 434.16211L152.01367 377.27539C131.15224 355.76877 109.85224 330.01133 88.212891 299.50781C163.93506 192.80386 235.70134 142.33057 297.84766 140.08594C321.03713 139.24837 345.5035 144.82962 371.17969 158.10938L429.63086 99.658203C389.28095 74.112324 347.77391 60.481577 304.97266 60.011719zM506.57617 164.13477L450 220.71094C470.20947 242.16957 491.00555 268.20117 512.4082 299.62891C432.36032 417.12964 360.51926 461.30947 297.92969 459.04883C276.74748 458.28376 254.42556 451.76693 231.23242 439.47852L172.28711 498.42383C211.38229 523.18429 252.12675 537.44604 295.04297 538.99609C402.07287 542.86185 501.15072 465.95461 593.82422 321.61133A40 40 0 0 0 599.95898 296.71289A40 40 0 0 0 599.73242 294.32031A40 40 0 0 0 599.60938 293.48633A40 40 0 0 0 593.74219 277.52344C565.30627 233.23316 536.26259 195.34152 506.57617 164.13477zM300 180C234.08138 180 180 234.08138 180 300C180 314.63297 182.79619 328.62076 187.66406 341.625L241.15625 288.13281C245.81666 264.29004 264.29004 245.81666 288.13281 241.15625L341.625 187.66406C328.62076 182.79619 314.63297 180 300 180zM412.33594 258.375L358.84375 311.86719C354.18334 335.70996 335.70996 354.18334 311.86719 358.84375L258.375 412.33594C271.37924 417.20381 285.36703 420 300 420C365.91862 420 420 365.91862 420 300C420 285.36703 417.20381 271.37924 412.33594 258.375z" />
                                                <path d="M570,0A30,30 0 0 0 548.78711,8.7871094L8.7871094,548.78711a30,30 0 0 0 0,42.42578 30,30 0 0 0 42.4257816,0L591.21289,51.212891a30,30 0 0 0 0,-42.4257816A30,30 0 0 0 570,0Z" />
                                            </g>
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit" // ปุ่มนี้จะ submit ฟอร์ม
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3 font-semibold"
                            >
                                Login
                            </button>
                        </form>{" "}
                        {/* จบฟอร์ม */}
                        {/* ✅ Signup + Forgot Password */}
                        <div className="flex justify-between text-sm mb-4">
                            <div className="text-blue-500 hover:underline cursor-pointer">
                                Sign In
                                {/* หมายเหตุ: ในโค้ดเดิมเป็น Sign In แต่อาจจะตั้งใจให้เป็น Sign Up? */}
                            </div>
                            <div className="text-blue-500 hover:underline cursor-pointer">
                                Forget Password?
                            </div>
                        </div>
                        {/* ✅ Social Login Buttons */}
                        <div className="flex items-center justify-between space-x-2">
                            <button
                                type="button"
                                className="w-1/2 bg-blue-800 text-white py-2 rounded hover:bg-blue-900 flex items-center justify-center gap-3.5 font-normal"
                            >
                                {/* Facebook SVG */}
                                <div className="inline-flex items-center justify-center rounded-full w-6 h-6">
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                    >
                                        <linearGradient
                                            id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                                            x1="9.993"
                                            x2="40.615"
                                            y1="9.993"
                                            y2="40.615"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            {/* แก้ไข stop-color เป็น stopColor */}
                                            <stop offset="0" stopColor="#2aa4f4"></stop>
                                            <stop offset="1" stopColor="#007ad9"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                                            d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                                        ></path>
                                        <path
                                            fill="#fff"
                                            d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                                        ></path>
                                    </svg>
                                </div>
                                Facebook
                            </button>
                            <button
                                type="button"
                                className="w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 font-normal"
                            >
                                {/* Google SVG */}
                                <div className="inline-flex items-center justify-center bg-white rounded-full w-6 h-6">
                                    <svg
                                        className="w-4 h-4"
                                        viewBox="-0.5 0 48 48"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000"
                                    >
                                        <g strokeWidth="0"></g>
                                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g>
                                            <title>Google-color</title>
                                            <desc>Created with Sketch.</desc>
                                            <defs></defs>
                                            <g
                                                stroke="none"
                                                strokeWidth="1"
                                                fill="none"
                                                fillRule="evenodd"
                                            >
                                                <g transform="translate(-401.000000, -860.000000)">
                                                    <g transform="translate(401.000000, 860.000000)">
                                                        <path
                                                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                            fill="#FBBC05"
                                                        ></path>
                                                        <path
                                                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                            fill="#EB4335"
                                                        ></path>
                                                        <path
                                                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                            fill="#34A853"
                                                        ></path>
                                                        <path
                                                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                            fill="#4285F4"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                Google
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;