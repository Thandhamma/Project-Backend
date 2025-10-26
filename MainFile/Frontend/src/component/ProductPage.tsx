import React from 'react';
import './Product.css'; // เราจะสร้างไฟล์นี้ในขั้นตอนถัดไป

// 1. กำหนด Type (Interface) สำหรับข้อมูลสินค้า
interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    originalPrice?: number; // ? หมายถึง optional (อาจจะมีหรือไม่มีก็ได้)
    badges?: ('NEW' | 'SALE')[];
}

// 2. สร้างข้อมูลจำลอง (Mock Data) อ้างอิงจากรูปภาพ
// (ใช้ URL รูปภาพตัวอย่างจาก placehold.co)
const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Care Bears Grumpy Bear Plush (25cm)',
        imageUrl: 'https://placehold.co/300x300/E0F2FE/0284C7?text=Grumpy+Bear',
        price: 595,
    },
    {
        id: 2,
        name: 'Care Bears Love A Lot Bear Plush (25cm)',
        imageUrl: 'https://placehold.co/300x300/FCE7F3/DB2777?text=Love+A+Lot',
        price: 595,
        badges: ['NEW'],
    },
    {
        id: 3,
        name: 'Pabobo Soothy Clip Rechargeable Bedtime Bear Silicone Light',
        imageUrl: 'https://placehold.co/300x300/A5F3FC/0E7490?text=Bear+Light',
        price: 1425,
        originalPrice: 2500,
        badges: ['SALE'],
    },
    {
        id: 4,
        name: 'Care Bears True Heart Bear Plush (25cm)',
        imageUrl: 'https://placehold.co/300x300/F3E8FF/7E22CE?text=True+Heart',
        price: 650,
    },
    // สามารถเพิ่มสินค้าชิ้นอื่นๆ ที่นี่ได้
];

// 3. คอมโพเนนต์ "การ์ดสินค้า" (ProductCard)
// คอมโพเนนต์นี้จะรับข้อมูลสินค้า (product) 1 ชิ้นผ่าน props
interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            {/* แสดงป้าย NEW หรือ SALE */}
            <div className="badge-container">
                {product.badges?.map((badge) => (
                    <span key={badge} className={`badge ${badge.toLowerCase()}`}>
                        {badge}
                    </span>
                ))}
            </div>

            {/* ปุ่ม Wishlist (รูปหัวใจ) */}
            <button className="wishlist-button" aria-label="Add to wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </button>

            {/* รูปสินค้า */}
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>

            {/* ข้อมูลสินค้า (ชื่อ, ราคา) */}
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="price-container">
                    {product.originalPrice ? (
                        // กรณีมีส่วนลด (แสดงราคาก่อนลดและราคาลด)
                        <>
                            <span className="price-sale">฿{product.price.toLocaleString()}</span>
                            <span className="price-original">฿{product.originalPrice.toLocaleString()}</span>
                        </>
                    ) : (
                        // กรณีราคาปกติ
                        <span className="price-regular">฿{product.price.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. คอมโพเนนต์ "หน้าสินค้า" (ProductPage) - (Default Export)
const ProductPage: React.FC = () => {
    return (
        <div className="product-page-container">
            {/* ส่วนหัว (จำนวนผลลัพธ์ และ ปุ่ม Filter/Sort) */}
            <div className="product-header">
                <span className="results-text">
                    83 results for <strong>care bear</strong>
                </span>
                <div className="filter-controls">
                    <button className="filter-button">filter</button>
                    <button className="filter-button">sort</button>
                </div>
            </div>

            {/* ตารางแสดงผลสินค้า (Grid) */}
            <div className="product-grid">
                {/* วนลูปข้อมูล mockProducts เพื่อสร้าง ProductCard */}
                {mockProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;