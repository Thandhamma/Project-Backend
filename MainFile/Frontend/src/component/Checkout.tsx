import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../App/store";
import { clearCart } from "../../features/cart/cartSlice";

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost = 50.0;
  const taxRate = 0.07;
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || cartItems.length === 0) return;

    setIsSubmitting(true);
    console.log("Placing order with:", {
      shippingAddress,
      paymentDetails,
      items: cartItems,
      total: orderTotal,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      dispatch(clearCart());
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="font-sans max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been placed successfully.
        </p>
        <p className="text-gray-600">
          Order details have been sent to your email.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* --- (A) Shipping & Payment --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={shippingAddress.phone}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              {/* Address Line 1 */}
              <div className="md:col-span-2">
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  required
                  value={shippingAddress.addressLine1}
                  onChange={handleShippingChange}
                  placeholder="Street address, P.O. box, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City / District
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  required
                  value={shippingAddress.postalCode}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Payment Details
            </h2>
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  required
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="**** **** **** ****"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Expiry Date */}
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    required
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                {/* CVV */}
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    required
                    value={paymentDetails.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- (B) Order Summary --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-28">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 my-4">
                Your cart is empty.
              </p>
            ) : (
              <>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-2 last:border-b-0"
                    >
                      <img
                        src={item.image || "https://placehold.co/64x64"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        ฿{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>฿{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>฿{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                    <span>฿{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>฿{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className={`w-full mt-6 py-3 px-4 rounded-full text-white font-semibold transition-colors duration-200
                                        ${
                                          isSubmitting || cartItems.length === 0
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-pink-500 hover:bg-pink-600"
                                        }`}
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
