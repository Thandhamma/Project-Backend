// 🚀 1. Import 'Link' จาก react-router-dom
import backgroundImage from '../img/imgBackground.png';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <main className="w-full h-full flex-grow">
      <div className="w-full h-full">
        <div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat text-center drop-shadow-lg flex items-start justify-center pt-3"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            fontFamily: "'Baloo 2', cursive",
          }}
        >
          <h1
            className="text-5xl font-bold text-pink-500 -webkit-text-stroke: 1px #d8b4fe; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); bg-white/30 px-4 py-2 rounded-xl"
          >
            Care Bear Wonderland!
          </h1>
          <div className="absolute top-6 right-6 flex gap-4 z-20">
            {/* 🚀 2. ใช้ <Link> ครอบปุ่มเพื่อทำให้เป็นลิงก์ */}
            <Link to="/products">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-semibold py-2 px-6 rounded-full shadow-lg transition hover:text-gray-700 hover:font-bold hover:shadow-lg hover:scale-105"
              >
                Shopping!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
