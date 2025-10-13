// 🚀 1. Import คอมโพเนนต์ที่จำเป็น
import Header from '../componentsHome/Header'; // 👈 **เพิ่มบรรทัดนี้**
import HeroSection from '../componentsHome/HeroSection';
import Footer from '../componentsHome/Footer';

// 🚀 2. สร้าง Page Component
function HomePage() {
    // ฟังก์ชันจำลองสำหรับการคลิกปุ่ม Login (คุณอาจมีฟังก์ชันจริงอยู่แล้ว)
    const handleLoginClick = () => {
        console.log("Login button clicked on HomePage!");
        // ใส่โค้ดเปิด Modal Login ของคุณที่นี่
    };

    return (
        <>
            {/* 🚀 3. เรียกใช้ Header และส่ง prop 'showCart' เป็น 'false' 
              เพื่อบอกให้ซ่อนไอคอนตะกร้าในหน้านี้โดยเฉพาะ
            */}
            <Header onLoginClick={handleLoginClick} showCart={false} />

            <main> {/* ครอบเนื้อหาหลักด้วย <main> เพื่อความหมายที่ดีของ HTML */}
                <HeroSection />
            </main>

            <Footer />
        </>
    );
}

export default HomePage;