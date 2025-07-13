'use client';
import React, { Suspense } from 'react';
import OrderDetails from './OrderDetails';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Order Confirmed!</h1>
      <Suspense fallback={<div>Loading order details...</div>}>
        <OrderDetails />
      </Suspense>
      <button
        onClick={() => window.location.href = '/'}
        className="mt-8 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Continue Shopping
      </button>
    </div>
  );
}