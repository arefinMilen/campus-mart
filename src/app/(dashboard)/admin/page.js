'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AdminDashboard() {
  // Example data, replace with real fetch logic
  const stats = {
    users: 120,
    products: 340,
    pendingApprovals: 5,
    reports: 2,
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'admin') {
      router.replace('/login');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold">Total Users</div>
          <div className="text-3xl">{stats.users}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold">Total Products</div>
          <div className="text-3xl">{stats.products}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold">Pending Approvals</div>
          <div className="text-3xl">{stats.pendingApprovals}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold">Reports</div>
          <div className="text-3xl">{stats.reports}</div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Review pending product approvals</li>
          <li>Manage users</li>
          <li>View reported listings</li>
        </ul>
      </div>
    </div>
  );
}