import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // สำหรับ Global Styles

// --- 1. Import Page และ Component ---
// ❌ ลบ Header ออกจากตรงนี้ เพราะเราจะไปเรียกใช้ในแต่ละหน้าแทน
// import Header from './componentsHome/Header'; 
import ProductPage from './componentsProduct/ProductPage';
import LoginModal from './componentsHome/LoginModal';
import HomePage from './page/homePage';

// App คือคอมโพเนนต์หลักที่จัดการทุกอย่าง
function App() {
  // --- State และ Functions ยังคงอยู่ที่นี่ เพราะเป็นการจัดการส่วนกลาง ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 🚀 **สำคัญ:** ตอนนี้แต่ละหน้า (HomePage, ProductPage) 
  // จะต้องรับฟังก์ชัน handleLoginClick ไปส่งต่อให้ Header ของตัวเอง
  // เราจะส่ง props ผ่าน element ของ Route แบบนี้
  const passPropsToHomePage = <HomePage onLoginClick={handleLoginClick} />;
  const passPropsToProductPage = <ProductPage onLoginClick={handleLoginClick} />;

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen font-sans">
        {/* ❌ Header ถูกย้ายออกไปจากตรงนี้แล้ว */}

        {/* Routes จะทำหน้าที่สลับ "ทั้งหน้า" ซึ่งแต่ละหน้าจะมี Header ของตัวเอง */}
        <Routes>
          <Route path="/" element={passPropsToHomePage} />
          <Route path="/products" element={passPropsToProductPage} />
          {/* <Route path="/about" element={<AboutPage onLoginClick={handleLoginClick} />} />
                      <Route path="/contact" element={<ContactPage onLoginClick={handleLoginClick} />} />
                    */}
        </Routes>

        {/* LoginModal ยังอยู่ที่เดิม ถูกต้องแล้ว */}
        {isModalOpen && <LoginModal onClose={handleCloseModal} />}
      </div>
    </BrowserRouter>
  );
}

export default App;