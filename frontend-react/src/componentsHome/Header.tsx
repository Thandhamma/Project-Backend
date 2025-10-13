import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo1.jpg';

// --- Interface & SVG Icons (ไม่เปลี่ยนแปลง) ---

interface HeaderProps {
    onLoginClick: () => void;
    // 1. เพิ่ม prop 'showCart' และทำให้เป็น optional (มีเครื่องหมาย ?)
    //    เพื่อให้ไม่ต้องใส่ทุกครั้งที่เรียกใช้ component
    showCart?: boolean;
}

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// ... (โค้ด SVG อื่นๆ ไม่ต้องแก้ไข)

// 2. แก้ไข Function Component ให้รับ 'showCart' และกำหนดค่าเริ่มต้นเป็น true
//    หมายความว่า ถ้าไม่ส่งค่า showCart มา, ตะกร้าจะแสดงเป็นปกติ
function Header({ onLoginClick, showCart = true }: HeaderProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuVisible, setIsMenuVisible] = useState(true);

    // ... (ส่วนของ useEffect และ functions อื่นๆ ไม่ต้องแก้ไข)
    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY && currentY > 50) {
                setIsMenuVisible(false);
            } else {
                setIsMenuVisible(true);
            }
            lastScrollY = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClearSearch = () => setSearchTerm('');

    return (
        <header className="bg-pink-500 text-white p-2 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex flex-row justify-between items-center">
                {/* โลโก้ */}
                <Link to="/" className="block w-25 h-12 flex-shrink-0">
                    <img src={logo} alt="home" className="w-full h-full object-contain" />
                </Link>

                {/* Search Bar (เหมือนเดิม) */}
                <div className="group relative transition-all duration-300 ease-in-out w-48 focus-within:w-80">
                    {/* ... search bar JSX ... */}
                </div>

                {/* เมนูฝั่งขวา */}
                <div className="flex items-center justify-end space-x-2 sm:space-x-4">
                    <Link to="#" className="text-white hover:text-gray-300 text-sm sm:text-base">Account</Link>

                    {/* 3. ใช้เงื่อนไขเพื่อแสดง/ซ่อนตะกร้า */}
                    {showCart && (
                        <Link to="/cart" className="text-white hover:text-gray-700 relative">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H2m5 8a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                0 {/* 💡 ค่านี้ควรมาจาก Redux cartSlice */}
                            </span>
                        </Link>
                    )}

                    <button onClick={onLoginClick} className="group cursor-pointer inline-flex items-center ...">
                        Login / Register
                    </button>
                </div>
            </div>

            {/* Menu Bar (เหมือนเดิม) */}
            <div className={`mt-2 transition-all duration-400 ease-in-out ... ${isMenuVisible ? 'opacity-100 ...' : 'opacity-0 ...'}`}>
                <nav className="flex gap-8">
                    <Link to="/" className="...">Home</Link>
                    <Link to="/products" className="...">Products</Link>
                    <Link to="/about" className="...">About</Link>
                    <Link to="/contact" className="...">Contact</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;