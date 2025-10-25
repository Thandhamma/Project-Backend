// 1. 🚀 Import Type 'Product' จากไฟล์กลางที่เราสร้างไว้
import type { Product } from '../type/product';

// ✍️ กำหนดหน้าตาของ Props ที่คอมโพเนนต์นี้จะรับ
interface ProductCardProps {
    product: Product;
}

// ⭐️ Component สำหรับแสดงผลดาว Rating
const StarRating = ({ rating }: { rating: number }) => {
    const percentage = (rating / 5) * 100;
    return (
        <div className="flex items-center text-yellow-400 pl-1">
            <div className="relative flex text-lg">
                <div className="text-gray-300">★★★★★</div>
                <div className="absolute top-0 left-0 overflow-hidden text-yellow-400" style={{ width: `${percentage}%` }}>
                    ★★★★★
                </div>
            </div>
        </div>
    );
};

// 🃏 Component หลักสำหรับแสดงผลการ์ดสินค้า 1 ชิ้น
const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="product-card h-full flex flex-col">
            <a href="#" className="block product-card-inner border border-gray-200 rounded-lg p-3 bg-white transition-all transform duration-200 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                <div className="relative w-full" style={{ paddingTop: '100%' }}>
                    {/* ใช้ imageUrl จาก props */}
                    <img src={product.imageUrl} alt={product.name} className="absolute top-0 left-0 w-full h-full object-contain rounded-md" />
                </div>
                <div className="flex-grow mt-3 flex flex-col justify-between">
                    <div>
                        <div className="flex items-start justify-between px-1">
                            <h4 className="text-sm text-gray-800 font-medium truncate pr-2">{product.name}</h4>
                            <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{product.price} ฿</p>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <StarRating rating={product.rating} />
                            <button className="ml-2 p-1.5 rounded-full border border-gray-200 hover:bg-pink-100 transition-colors duration-200" aria-label={`Add ${product.name} to cart`}>
                                <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 3h2l.4 2H21a1 1 0 0 1 .96 1.27l-2.6 7.79a2 2 0 0 1-1.9 1.34H8.1l-.35 1.4H19v2H7a1 1 0 0 1-.96-1.27l1.1-4.4L5.2 6H3V3z" /><circle cx="9" cy="20" r="2" /><circle cx="17" cy="20" r="2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start flex-wrap gap-1 h-5 mt-2">
                        {/* วนลูปแสดงผล tags */}
                        {product.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 text-xs text-pink-700 bg-pink-100 rounded-full font-medium">{tag}</span>
                        ))}
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProductCard;

