import { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar.js'; // 👈 1. Import คอมโพเนนต์ใหม่

// --- Interfaces and Mock Data ---

// ✍️ กำหนดหน้าตาของข้อมูลสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number; // e.g., 4.5
  tags: string[];
  // ... other properties from data-* attributes
}

// 📦 สร้างข้อมูลสินค้าจำลอง (ควรดึงมาจาก API หรือ Redux ในแอปจริง)
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wish Bear (L)',
    price: 520,
    imageUrl: '/ImageForProject/wish-bear-large.png',
    rating: 4.0,
    tags: ['New arrival'],
  },
  {
    id: 2,
    name: 'Glumpy Bear (L)',
    price: 549,
    imageUrl: '/ImageForProject/glumpy-bear-large.png',
    rating: 3.5,
    tags: ['Limited'],
  },
  {
    id: 3,
    name: 'Bedtimes Bear (M)',
    price: 329,
    imageUrl: '/ImageForProject/bedtimes-bear-med.png',
    rating: 4.5,
    tags: ['Limited', 'New arrival'],
  },
  {
    id: 4,
    name: 'Care Bear Always There (M)',
    price: 325,
    imageUrl:
      '/ImageForProject/CareBearAlwaysThereBearPlushToyswithoutline-med.png',
    rating: 3.8,
    tags: [],
  },
  {
    id: 5,
    name: 'Sour Grumpy Yummy Yuppy',
    price: 500,
    imageUrl:
      '/ImageForProject/care-bears-sour-grumpy-bears-3-5oz-theater-box.jpg',
    rating: 5.0,
    tags: ['Limited', 'New arrival'],
  },
  {
    id: 6,
    name: 'Blue shirt with B&B',
    price: 945,
    imageUrl: '/ImageForProject/blue-shirtbear.jpg',
    rating: 2.5,
    tags: [],
  },
];

// --- Child Components ---

// ⭐️ Component สำหรับแสดงผลดาว Rating
const StarRating = ({ rating }: { rating: number }) => {
  const percentage = (rating / 5) * 100;
  return (
    <div className="flex items-center text-yellow-400 pl-1">
      <div className="relative flex text-lg">
        <div className="text-gray-300">★★★★★</div>
        <div
          className="absolute top-0 left-0 overflow-hidden text-yellow-400"
          style={{ width: `${percentage}%` }}
        >
          ★★★★★
        </div>
      </div>
    </div>
  );
};

// 🃏 Component สำหรับการ์ดสินค้าแต่ละชิ้น
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <a
        href="#"
        className="block product-card-inner border border-gray-200 rounded-lg p-3 bg-white transition-all transform duration-200 hover:shadow-lg hover:-translate-y-1"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-40 object-contain rounded-md mb-3"
        />
        <div className="flex items-center justify-between px-1">
          <div className="text-sm text-gray-800 truncate">{product.name}</div>
          <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            {product.price} ฿
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <StarRating rating={product.rating} />
          <button
            className="ml-2 p-1.5 rounded-full border border-gray-200 hover:bg-pink-100 transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg
              className="w-4 h-4 text-gray-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3h2l.4 2H21a1 1 0 0 1 .96 1.27l-2.6 7.79a2 2 0 0 1-1.9 1.34H8.1l-.35 1.4H19v2H7a1 1 0 0 1-.96-1.27l1.1-4.4L5.2 6H3V3z" />
              <circle cx="9" cy="20" r="2" />
              <circle cx="17" cy="20" r="2" />
            </svg>
          </button>
        </div>
        <div className="flex items-start flex-wrap gap-2 h-5 mt-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs text-pink-500 bg-pink-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
};

// 🖼️ Component สำหรับตารางแสดงผลสินค้า
const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-white rounded-lg h-full overflow-y-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

// --- Main Page Component ---

function ProductPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // 🚀 ควรดึงข้อมูลสินค้าจริงจาก Redux Store
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  return (
    <main className="overflow-y-auto w-full px-4 py-1 bg-rose-50 flex-grow">
      <h3
        className="comicRelief text-3xl font-extrabold mb-6 mt-3 text-center text-white bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 px-6 py-2.5 rounded-full shadow-[0_4px_20px_rgba(255,105,180,0.6)] w-full max-w-2xl mx-auto border border-white/40"
        style={{
          textShadow:
            '2px 2px 6px rgba(0,0,0,0.35), 0 0 8px rgba(255,255,255,0.9);',
        }}
      >
        ✨ Welcome to the Care Bear Collection 🐻🌈 ✨
      </h3>

      <div className="flex gap-4 p-2 h-[calc(100vh-200px)]">
        {/* ปุ่มเปิด Filter Tab (เมื่อ Sidebar ถูกซ่อน) */}
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-8 h-16 rounded-r-lg bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition-all"
            aria-label="Open filter"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Filter Sidebar */}
        <FilterSidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(true)}
        />

        {/* Product Gallery */}
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  );
}

export default ProductPage;
