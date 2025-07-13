'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function OrderDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <>
      <p className="text-lg mb-2">Thank you for your purchase.</p>
      {orderId ? (
        <p className="text-xl font-semibold">Your Order ID: <span className="text-blue-500">{orderId}</span></p>
      ) : (
        <p className="text-xl font-semibold">Your order has been placed successfully.</p>
      )}
      <p className="mt-6 text-gray-600">You will receive an email confirmation shortly.</p>
    </>
  );
}