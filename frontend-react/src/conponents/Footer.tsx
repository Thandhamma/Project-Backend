
// import { Link } from 'react-router-dom'; // 👈 ควรใช้ Link แทน <a> สำหรับลิงก์ภายในเว็บ

function Footer() {
    return (
        // 💡 ใช้ <footer /> เป็น Tag หลัก และรวมทุกอย่างไว้ใน container เดียว
        <footer className="fixed bottom-0 left-0 w-full bg-transparent text-gray-800 py-2 z-10 text-center">
            <div className="container mx-auto flex flex-col sm:relative sm:flex-row sm:justify-center sm:items-center">

                {/* ส่วนของ Policy Links */}
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm">
                    {/* 💡 ใน React จริง ควรเปลี่ยน <a> เป็น <Link> เพื่อไม่ให้หน้าเว็บโหลดใหม่ */}
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">CA Supply Chain</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">CA Privacy Rights</a>
                    <a href="#" className="hover:underline">Your Privacy Choices</a>
                    <a href="#" className="hover:underline">Interest Based Ads</a>
                </div>

                {/* ส่วนของ Copyright */}
                <p className="text-xs mt-2 sm:absolute sm:right-0 sm:mt-0">
                    © 2025 Target Brands, Inc.
                </p>

            </div>
        </footer>
    );
}

export default Footer;