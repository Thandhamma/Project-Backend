// import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom'; // 👈 ควรใช้สำหรับ Navigation ในแอปจริง

// // ✍️ สร้าง Interface สำหรับ Props ที่จะรับจาก Component แม่
// interface HeaderProps {
//     onLoginClick: () => void;
// }

// // --- SVG Icons as Components for Readability ---
// const SearchIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
// );

// const CloseIcon = () => (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <line x1="18" y1="6" x2="6" y2="18"></line>
//         <line x1="6" y1="6" x2="18" y2="18"></line>
//     </svg>
// );


// function Header({ onLoginClick }: HeaderProps) {
//     // --- State Management ---
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isMenuVisible, setIsMenuVisible] = useState(true);

//     // --- Side Effects for Scroll Behavior ---
//     useEffect(() => {
//         let lastScrollY = window.scrollY;

//         const handleScroll = () => {
//             const currentY = window.scrollY;
//             if (currentY > lastScrollY && currentY > 50) {
//                 setIsMenuVisible(false); // เลื่อนลง -> ซ่อน
//             } else {
//                 setIsMenuVisible(true); // เลื่อนขึ้น -> แสดง
//             }
//             lastScrollY = currentY;
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });

//         // Cleanup function: ลบ listener ออกเมื่อ component ถูก unmount
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []); // [] หมายถึงให้ effect นี้ทำงานแค่ครั้งเดียว

//     const handleClearSearch = () => {
//         setSearchTerm('');
//         // สามารถ focus input ได้โดยใช้ useRef หากต้องการ
//     };

//     return (
//         <header className="bg-pink-500 text-white p-2 sticky top-0 z-50 shadow-md">
//             <div className="container mx-auto flex flex-row justify-between items-center">
//                 {/* โลโก้ */}
//                 <div className="flex items-center justify-center w-30 h-18 rounded-md overflow-hidden transition duration-300 hover:bg-pink-200/70 hover:scale-105">
//                     {/* 💡 ในแอปจริงควรใช้ <Link to="/"> */}
//                     <a href="/" className="block w-25 h-12">
//                         <img
//                             src="/ImageForProject/logo1.jpg" // 👈 อ้างอิงจาก public folder
//                             alt="home"
//                             className="w-full h-full object-contain"
//                         />
//                     </a>
//                 </div>

//                 {/* แถบค้นหา (Search Bar) */}
//                 <div className="group relative transition-all duration-300 ease-in-out w-48 focus-within:w-80">
//                     <div className="flex items-center border border-white/30 rounded-full px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md shadow-sm">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className={`flex-grow outline-none text-sm bg-transparent placeholder-white transition-all duration-200 ease-in-out ${searchTerm ? 'text-gray-300' : 'text-white'
//                                 }`}
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <button
//                             onClick={handleClearSearch}
//                             className="ml-2 text-white hover:text-pink-300 transition"
//                         >
//                             {/* 🚀 แสดงไอคอนตาม State ของ searchTerm */}
//                             {searchTerm ? <CloseIcon /> : <SearchIcon />}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Wrapper เมนูฝั่งขวา */}
//                 <div className="flex items-center justify-end space-x-2 sm:space-x-4 lg:space-x-6 px-4 py-2">
//                     {/* ... ส่วนของปุ่มเปลี่ยนภาษาและ Account ... */}
//                     <a href="#" className="text-white hover:text-gray-300 text-sm sm:text-base">Account</a>

//                     <a href="#" className="text-white hover:text-gray-700 relative">
//                         <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H2m5 8a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4z" />
//                         </svg>
//                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
//                             0 {/* 💡 ค่านี้ควรมาจาก Redux cartSlice */}
//                         </span>
//                     </a>

//                     {/* ปุ่ม Login / Register */}
//                     <button
//                         onClick={onLoginClick} // 👈 เรียกฟังก์ชันที่รับมาจาก Props
//                         className="group cursor-pointer inline-flex items-center gap-2 px-5 py-2 rounded-[25px] bg-white border border-gray-200 text-pink-500 font-semibold hover:bg-pink-200 hover:text-gray-700 transition duration-200"
//                     >
//                         <svg className="w-5 h-5 text-pink-500 group-hover:text-gray-700" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
//                         </svg>
//                         Login / Register
//                     </button>
//                 </div>
//             </div>

//             {/* Menu Bar ที่ซ่อน/แสดง */}
//             <div
//                 className={`mt-2 transition-all duration-400 ease-in-out bg-transparent text-white border-t border-black text-sm px-[100px] ${isMenuVisible ? 'opacity-100 translate-y-0 h-6' : 'opacity-0 -translate-y-full h-0 invisible'
//                     }`}
//             >
//                 <nav className="flex gap-8">
//                     <a href="/" className="px-5 py-1 font-medium tracking-wide transition-all duration-300 transform hover:bg-white hover:text-[#9b5de5] hover:font-bold hover:shadow-lg hover:scale-105">Home</a>
//                     <a href="/products" className="px-5 py-1 font-medium tracking-wide transition-all duration-300 transform hover:bg-white hover:text-[#fee440] hover:font-bold hover:shadow-lg hover:scale-105">Products</a>
//                     <a href="#" className="px-5 py-1 font-medium tracking-wide transition-all duration-300 transform hover:bg-white hover:text-[#00bbf9] hover:font-bold hover:shadow-lg hover:scale-105">About</a>
//                     <a href="#" className="px-5 py-1 font-medium tracking-wide transition-all duration-300 transform hover:bg-white hover:text-[#00f5d4] hover:font-bold hover:shadow-lg hover:scale-105">Contact</a>
//                 </nav>
//             </div>
//         </header>
//     );
// }

// export default Header;

