import React from 'react';
import backgroundImage from '../img/imgBackground.png';
const Home: React.FC = () => {
    return (
        // นี่คือโค้ด <main> จากไฟล์ "Care Bears"
        <main className="w-full h-full flex-grow">
            <div className="w-full h-full">
                {/* ส่วนแสดงผล และฟอนต์*/}
                <div
                    className="relative min-h-screen bg-cover bg-center bg-no-repeat text-center drop-shadow-lg flex items-start justify-center pt-3"
                    style={{
                        // เราใช้ path แบบ absolute ("/...") เพราะไฟล์อยู่ใน public
                        backgroundImage: `url(${backgroundImage})`,
                        fontFamily: "'Baloo 2', cursive", // (อย่าลืม import font นี้ใน index.html)
                    }}
                >
                    {/* ข้อความหลัก */}
                    <h1 className="text-5xl font-bold text-pink-500 -webkit-text-stroke: 1px #d8b4fe; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); bg-white/30 px-4 py-2 rounded-xl">
                        Care Bear Wonderland!
                    </h1>

                    {/* ปุ่มที่มุมขวาบน */}
                    <div className="absolute top-6 right-6 flex gap-4 z-20">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-semibold py-2 px-6 rounded-full shadow-lg transition hover:text-gray-700 hover:font-bold hover:shadow-lg hover:scale-105"
                            onClick={() => (window.location.href = 'Main.html')} // (คุณอาจจะต้องเปลี่ยนลิงก์นี้เป็น /products หรืออย่างอื่น)
                        >
                            Shopping!
                        </button>
                    </div>

                    {/* Policy Links */}
                    <div className="fixed bottom-0 left-0 w-full flex justify-center flex-wrap gap-x-4 gap-y-2 mb-1 text-white-900 pb-4">
                        <a href="#" className="text-white-700 hover:underline" data-text="Term">
                            Terms
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="CA">
                            CA Supply Chain
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="Privacy">
                            Privacy
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="CAPrivacy">
                            CA Privacy Rights
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="Privacy3">
                            Your Privacy Choices
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="IBA">
                            Interest Based Ads
                        </a>
                        <a href="#" className="text-white-700 hover:underline" data-text="HPP">
                            Health Privacy Policy
                        </a>
                    </div>

                    {/* Copyright */}
                    <p
                        className="fixed bottom-0 justify-end w-full flex text-center text-white-700 mt-2 pb-2 text-xs mr-4"
                        data-text="copyr"
                    >
                        © 2025 Target Brands, Inc.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Home;