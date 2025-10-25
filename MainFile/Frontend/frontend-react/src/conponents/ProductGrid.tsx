// 1. 🚀 Import Type 'Product' จากไฟล์กลางที่เราสร้างไว้
import type { Product } from '../type/product';
// 2. Import คอมโพเน้นต์ ProductCard เข้ามาเพื่อใช้งาน
import ProductCard from './ProductCard';

// ✍️ กำหนดหน้าตาของ Props ที่คอมโพเนนต์นี้จะรับ
interface ProductGridProps {
  products: Product[]; // ระบุว่าจะต้องรับ array ของ Product เข้ามา
}

// 🖼️ คอมโพเนนต์หลักสำหรับแสดงผลตารางสินค้า
const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-white rounded-lg h-full overflow-y-auto">
            {/* 🚀 ใช้ฟังก์ชัน .map() เพื่อวนลูปข้อมูลสินค้าที่ได้รับมา
              แล้วส่งข้อมูลต่อไปให้ ProductCard ทีละชิ้นผ่าน props
            */}
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </section>
    );
};

export default ProductGrid;

