'use client'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function BuyerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'buyer') {
      router.replace('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'buyer') {
    return <div>Loading...</div>;
  }

  // Example data, replace with real fetch logic
  const orders = [
    { id: 1, product: 'MacBook Pro', status: 'Shipped', date: '2025-07-01' },
    { id: 2, product: 'Engineering Textbook', status: 'Delivered', date: '2025-06-28' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Your Orders</h2>
        <ul className="divide-y">
          {orders.map(order => (
            <li key={order.id} className="py-3 flex justify-between">
              <span>{order.product}</span>
              <span className="text-gray-500">{order.status}</span>
              <span className="text-gray-400 text-sm">{order.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}