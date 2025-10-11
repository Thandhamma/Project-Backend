import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // 👈 ควรใช้ Link แทน <a> สำหรับการเปลี่ยนหน้า
import logo from '../img/logo1.jpg'; // 👈 นำเข้ารูปภาพจาก assets

// ✍️ สร้าง Props Interface เพื่อรับฟังก์ชันจาก Component แม่
interface HeaderProps {
    onLoginClick: () => void;
    onNavigate: (path: string) => void; // สมมติว่ามีการจัดการ routing
}

function Header({ onLoginClick, onNavigate }: HeaderProps) {
    // --- State Management ---
    // State สำหรับควบคุมการแสดงผลของ Menu Bar ตอน scroll
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    // --- Side Effects ---
    // useEffect สำหรับจัดการ Scroll Event Listener
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentY = window.scrollY;
            // ถ้าเลื่อนลงและ scroll เกิน 50px ให้ซ่อนเมนู
            if (currentY > lastScrollY && currentY > 50) {
                setIsMenuVisible(false);
            } else {
                // ถ้าเลื่อนขึ้นให้แสดงเมนู
                setIsMenuVisible(true);
            }
            lastScrollY = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup function: จะถูกเรียกเมื่อ Component ถูกเอาออกจากหน้าจอ
        // เพื่อป้องกัน memory leak
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // [] หมายความว่า effect นี้จะทำงานแค่ครั้งเดียว (ตอน mount)

    return (
        <header className="bg-pink-400 text-white p-[10.5px] sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex flex-row justify-between items-center">
                {/* โลโก้ 'target' */}
                <div className="flex items-center justify-center w-30 h-18 rounded-md overflow-hidden transition duration-300 hover:bg-pink-200/70 hover:scale-105">
                    {/* 💡 ใช้ Link จาก react-router-dom แทน <a> */}
                    <a href="/" className="block w-25 h-12">
                        <img
                            src={logo} // 👈 ใช้รูปที่ import เข้ามา
                            alt="home"
                            className="w-full h-full object-contain shadow-inner shadow-xs"
                        />
                    </a>
                </div>

                {/* Wrapper หลักสำหรับเมนูฝั่งขวา */}
                <div className="flex items-center justify-end space-x-2 sm:space-x-4 lg:space-x-6 px-4 py-2">
                    {/* ปุ่มเปลี่ยนภาษา */}
                    <div className="relative group" id="langSwitcher">
                        <button className="flex items-center gap-1 px-3 bg-transparent text-base text-white transition duration-300 ease-in-out hover:text-gray-700">
                            <span className="w-5 h-5">
                                {/* SVG Icon for Language */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4">
                                    <path d="M93.8,114.6c-4.7,1.1-1.7,0.9-5.6,1.4C71.5,119.6,83.9,122.8,93.8,114.6z M387.5,121.3c1.2-0.8,5.4-4.9-7.7-8.9 c0.8,4.1-2.7,3.7-2.7,6c9.7,8.8,13.7,24.1,26.1,27.3C405.6,134.7,392.2,129.3,387.5,121.3z M84.9,111.4c1.5,8.9,8.2-9.4,8.3-15.9 c-2.6,1.5-5.2,3-7.9,4.2c6.3,3.2,0.8,6.6-6,11.7C65.5,128.6,92.2,98,84.9,111.4z M256,0C114.6,0,0,114.6,0,256 c0,141.3,114.6,256,256,256c141.4,0,256-114.7,256-256C512,114.6,397.4,0,256,0z M262.8,85.8l1.2,0.4c-4.8,6.2,25,24.3,3.6,25.8 c-20,5.7,8.4-5.2-7.1-3.3C268.7,97.3,254,97.1,262.8,85.8z M141.4,102.2c-7.2-6-29.8,8.2-21.9,4.8c19.6-7.7,1.3,0.8,5.9,10 c-4.2,8.7-1.4-8.6-11.8,1.7c-7.5,1.7-25.9,18.7-23.6,13.5c-0.6,8.1-21.9,17.7-24.8,31.2c-7,18.7-1.7-0.7-3-8 c-10-12.7-28.2,21.5-22.8,35c9.1-16,8.4-1.7,1.8,5.4c6.7,12.3-6.1,28.3,6.6,37.4c5.6,1.3,16.8-18.8,11.9,2.1 c3.4-18.1,9.4,4.3,19.1-0.7c0.6,9.5,6.5,5.1,7.8,16.6c16.2-1.2,31,26.2,11.7,31.4c2.9-0.8,8.6,4.3,15.2,0.4 c11.2,8.9,40.7,10,41.5,32c-20.3,9.7-5,36.3-22.6,45.8c-20.2-3-6.9,24.9-15.4,21.7c3.4,20.1-20.4-2.6-11.2,8.5 c16.9,10.4-7.4,8.3,0.2,15.9c-8.5-1.8,5.3,15.8,7.6,22.3c12.2,19.8-10.5-4.4-17.2-11c-6.4-12.8-21.5-37.3-25.7-57.4 c-2.4-29.2-25-48.8-30.2-77.3c-5.2-15.9,14.3-41.4,3.8-50.3c-9.1-7.1-5.4-31.4-10.8-44.2c13.5-58.5,56.4-107.8,107.9-137 c-5.3,3.9,30.3-10.1,26.2-6.7c-1.1,2.5,20.8-9.5,34-11.3c-1.4,0.2-34.3,12-25.2,10.4c-14.1,6.9-1.4,3,5.6-0.5 c-14,10.3-24.8,7.4-40.7,16.5c-16,4.2-12.7,20.8-24.1,29.1c6.7,1.2,23.5-17.3,33.3-23.8c22.5-10.9-11.4,19.8,10,6.6 c-7.2,6.7-5.7,17.4-10.1,20.4C148.2,92.1,159.1,97.9,141.4,102.2z M176.4,56.2c-2.3,3.1-5.5,9.8-7.4,5.7c-2.6,1.3-3.6,6.9-8.5,2.4 c2.9-2.1,5.9-7.1,0.2-4c2.6-2.8,25.8-10.7,24.5-13.7c4.1-2.6,3.7-3.9-1-2.3c-2.4-0.8,5.7-7.6,16.5-8.5c1.5,0,2.1,1-0.6,0.7 c-16.3,5-9.3,3.6,1.7,0c-4.2,2.4-7.1,3.1-7.8,4.2c11-4-0.6,2.9,1.9,2.4c-3.1,1.6,0.5,2.1-5.5,4.4c1.1-0.9-9.8,6.5-3.3,4.3 C180.8,57.8,178,57.9,176.4,56.2z M186,70.5c0.2-9.6,14-15.7,12.3-16.2c17-8-5.9,0.3,7.5-6.9c5-0.5,15.6-16.5,30.3-17.5 c16.2-4.9,8.7,0.3,20.7-4.3l-2.4,2c-2.1,0.3,0.5,4-7.1,9.6c-0.8,8.7-14.5,4.7-7.7,14c-4.4-6.3-11-0.2-2.7,0.4 c-8.9,6.8-29.6,8-39.5,19.3C191,80.1,185.1,77.2,186,70.5z M257.1,102.5c-6.8,16.4-13.4-2.4-1.4-5.4 C258.7,98.7,259.9,99.2,257.1,102.5z M231.5,69.7c-2-7.4-0.4-3.5,11.5-7C251.2,68.6,235.7,72.5,231.5,69.7z M417.7,363.2 c-9.4-16.2,11.4-31.2,18.4-44.8C435.2,334.3,433.2,350,417.7,363.2z M453.1,178.1c-10.2,0.8-19.4,3.2-28.6-2.6 c-21.2-23.2,3.9,26.2,10.9,6c25.2,9.6-0.4,51-16.3,46.7c-8.9-19.2-19.9-40.3-39.3-49.7c14.9,16.5,22.3,36.8,38.3,51.7 c1.1,20.8,22.2-7.6,20.9,8.5c2,27.7-31.3,44.3-25.5,72.1c12.4,25.3-23.9,29.9-19.8,52.6c-14.6,16.3-30.2,38.3-56.4,34.8 c0-13.8-7-25.5-8.6-39.7c-14.2-18,15-37.3-3.1-56.1c-20.9-4.7,4.3-33.5-17.2-30.8c-12.9-12.9-31.8-0.4-50.3-0.3 c-23.2,2.2-47.1-28.5-36.8-50.2c-8.2-22.6,26-29.2,26.9-49.1c16.4-13.7,39.7-12,61.9-15.2c-1.6,15.9,15.2,16,27.9,21.3 c7.1-17.2,29.2,2.8,44.3-8.1c5.2-25.4-14.7-10.1-26.1-18.2c-13.8-20.2,29.5-10.4,25-21c-16.8-0.1-7.3-20.7-19.2-9.2 c10.7,1.9-1.9,10.3-1.6,0.7c-16.2-4.7-0.6,18.4-8.8,20.6c-12.5-5.2-6.6,5.9-5.3,7.6c-5.4,11.7-12-17.2-27.3-16.4 c-15.2-13.9-6,6.3,7.2,9.6c-2.8,0.8,1.6,12.3-1.9,7.4c-10.9-15-31.6-25-43.9-6.6c-1.3,17.2-36.3,22.1-30.7,2 c-8.2-20.8,25.4-0.6,22.3-17.2c-21.6-14.3,5.9-9.7,13.2-23.1c16.6,0.5,0.7-13.6,8.5-17.7c-0.8,15.3,12.7,12.4,23.4,9.5 c-2.6-8.8,6.4-8.5,0.9-15.8c24.8-9.9-18.9,4.6-10.1-17.1c-10.7-7.4-4.5,16.3,0,18.8c0.3,7.3-5.9,16.3-14.4,1 c-12.4,8.1-11.1-8.2-11.9-6.5c-1.4-6.3,9.4-6.6,9.5-17.6c-0.9-7-0.7-10.7,4.3-11.1c0.4,1,20.5,1.3,27.6,9.6 c-19.4-3.9-2.9,3.2,5.8,7.2c-9.3-7.3,3.7,0-3.9-8.3c3,0.6-8.3-11.4,3.3-0.9c-6.3-7.5,12.3-5.3,1.3-10.9c16.1,4.5,6.6,0.4-2.9-3.7 c-26.2-15.6,46.3,21.1,16.7,4.8c18.9,4.1-40.4-14.6-13.4-6.4c-10.3-4.5-0.3-2,9,0.9c-16.7-5.2-41.7-14.9-40.7-15.3 c5.8,0.4,11.5,1.7,17,3.3c17.1,5.1-4.9-1.2-0.2-1.1C373.8,44,425.3,83.4,456.6,134.9c7.3,7.7,27.2,58.6,16.8,36 c4.7,18,5.4,37.4,7.9,55.8c-5.2-5.8-11-27.2-16-39.1C463.2,192.2,460.8,181.1,453.1,178.1z" />
                                </svg>
                            </span>
                            Language
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-tl-md rounded-tr-md rounded-br-xl rounded-bl-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-300 z-10 shadow-md p-1">
                            <ul className="text-sm text-gray-700 rounded-tl-md rounded-tr-md rounded-br-xl rounded-bl-x overflow-hidden">
                                <li><button data-lang="th" className="w-full px-4 py-2 text-left hover:bg-pink-100 ...">ไทย</button></li>
                                <li><button data-lang="en" className="w-full px-4 py-2 text-left hover:bg-pink-100 ...">English</button></li>
                            </ul>
                        </div>
                    </div>

                    {/* Account Link */}
                    <a href="/account" className="text-white hover:text-gray-700 text-sm sm:text-base">Account</a>

                    {/* ปุ่ม Login / Register */}
                    <button
                        onClick={onLoginClick} // 👈 เรียกใช้ฟังก์ชันที่รับมาจาก props
                        className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-white border border-gray-200 text-pink-500 font-semibold hover:bg-pink-200 hover:text-gray-700 transition duration-200"
                    >
                        <svg className="w-5 h-5 text-pink-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                        Login / Register
                    </button>
                </div>
            </div>

            {/* Menu Bar ที่จะซ่อน/แสดงตอน scroll */}
            <div
                id="menuBar"
                // 🚀 ใช้ State ในการควบคุม ClassName เพื่อแสดงผล
                className={`mt-2 transition-all duration-400 ease-in-out bg-transparent text-white border-t border-black text-sm px-[100px] ${isMenuVisible ? 'opacity-100 translate-y-0 h-6' : 'opacity-0 -translate-y-full h-0 invisible'
                    }`}
            >
                {<nav className="flex gap-8">
                    {/* เวลาเรียกใช้ ต้องเช็คก่อนว่ามีฟังก์ชันนี้จริงไหม */}
                    <button onClick={() => onNavigate?.('/home')}>Home</button>
                    <button onClick={() => onNavigate?.('/products')}>Products</button>
                    <button onClick={() => onNavigate?.('/about')}>About</button>
                    <button onClick={() => onNavigate?.('/contact')}>Contact</button>
                </nav>/* <nav className="flex gap-8">
                    <a href="/" className="px-5 py-1 font-medium ...">Home</a>
                    <a href="/products" className="px-5 py-1 font-medium ...">Products</a>
                    <a href="/about" className="px-5 py-1 font-medium ...">About</a>
                    <a href="/contact" className="px-5 py-1 font-medium ...">Contact</a>
                </nav> */}
            </div>
        </header>
    );
}

export default Header;