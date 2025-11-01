import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
    alert("✅ Added to cart!");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-pink-50 py-12 px-6">
      <div className="bg-white rounded-3xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* รูปภาพสินค้า */}
        <div className="md:w-1/2 flex justify-center items-center bg-pink-100 p-6">
          <img
            src={
              product.image?.startsWith("/uploads/")
                ? `http://localhost:3000${product.image}` // ถ้ามี /uploads/ แล้ว → ใช้ตรงๆ
                : `http://localhost:3000/uploads/${product.image}` // ถ้ายังไม่มี → ต่อเพิ่ม
            }
            alt={product.name}
            className="rounded-2xl w-80 h-80 object-cover"
          />
        </div>

        {/* รายละเอียดสินค้า */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-pink-600 font-semibold mb-4">
              ฿{product.price}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description || "ไม่มีรายละเอียดเพิ่มเติม"}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-5 rounded-xl shadow transition-all"
            >
              🛒 Add to Cart
            </button>

            <Link
              to="/cart"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded-xl shadow transition-all"
            >
              ไปที่ตะกร้า
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
