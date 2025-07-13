
'use client'
import { useCart } from '../components/CartContext';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center border p-2 rounded">
              <span>
                {item.title} (${item.price}) x
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 mx-2 border rounded px-1"
                />
                = ${item.price * item.quantity}
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <div className="mb-4">
        <label className="font-semibold mr-2">Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="cash">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>
      <button
        disabled={cart.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}