"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const SellerDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Protect route: Only allow seller
  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'seller') {
      router.replace('/login');
    }
  }, [session, status, router]);

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeListings: 0,
    soldItems: 0,
    totalEarnings: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with API calls
  useEffect(() => {
    const fetchSellerData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const mockProducts = [
          {
            id: 1,
            title: 'Calculus Textbook',
            price: 150,
            category: 'Books',
            status: 'active',
            views: 24,
            inquiries: 5,
            datePosted: '2024-01-15',
            image: '/api/placeholder/150/150'
          },
          {
            id: 2,
            title: 'MacBook Pro 2020',
            price: 1200,
            category: 'Electronics',
            status: 'sold',
            views: 89,
            inquiries: 12,
            datePosted: '2024-01-10',
            image: '/api/placeholder/150/150'
          },
          {
            id: 3,
            title: 'Study Desk',
            price: 75,
            category: 'Furniture',
            status: 'active',
            views: 15,
            inquiries: 3,
            datePosted: '2024-01-12',
            image: '/api/placeholder/150/150'
          }
        ];

        setProducts(mockProducts);

        // Calculate stats
        const totalProducts = mockProducts.length;
        const activeListings = mockProducts.filter(p => p.status === 'active').length;
        const soldItems = mockProducts.filter(p => p.status === 'sold').length;
        const totalEarnings = mockProducts
          .filter(p => p.status === 'sold')
          .reduce((sum, p) => sum + p.price, 0);

        setStats({
          totalProducts,
          activeListings,
          soldItems,
          totalEarnings,
          pendingOrders: 2
        });
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  const handleEditProduct = (productId) => {
    router.push(`/dashboard/seller/edit-product/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        // API call to delete product
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      // API call to update product status
      setProducts(products.map(p =>
        p.id === productId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl" style={{ color }}>{icon}</div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex items-start space-x-4">
        {product.image && <Image
          src={product.image}
          alt={product.title}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-lg"
        />}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-xl font-bold text-green-600">${product.price}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span>👁️ {product.views} views</span>
            <span>💬 {product.inquiries} inquiries</span>
            <span>📅 {new Date(product.datePosted).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.status === 'active'
              ? 'bg-green-100 text-green-800'
              : product.status === 'sold'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {product.status}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditProduct(product.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
            >
              Delete
            </button>
          </div>
          {product.status === 'active' && (
            <select
              onChange={(e) => handleStatusChange(product.id, e.target.value)}
              className="text-xs border rounded px-2 py-1"
            >
              <option value="active">Active</option>
              <option value="sold">Mark as Sold</option>
              <option value="inactive">Deactivate</option>
            </select>
          )}
        </div>
      </div>
    </div>
  );

  if (status === 'loading' || loading || !session || session.user.role !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-gray-600">Manage your products and track sales</p>
            </div>
            <button
              onClick={() => router.push('/seller/add-product')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Add New Product
            </button>
            <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
    >
      Logout
    </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon="📦"
            color="#3B82F6"
          />
          <StatCard
            title="Active Listings"
            value={stats.activeListings}
            icon="🟢"
            color="#10B981"
          />
          <StatCard
            title="Sold Items"
            value={stats.soldItems}
            icon="✅"
            color="#8B5CF6"
          />
          <StatCard
            title="Total Earnings"
            value={`$${stats.totalEarnings}`}
            icon="💰"
            color="#F59E0B"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon="⏳"
            color="#EF4444"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'products', 'orders', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New inquiry on &quot;Calculus Textbook&quot;</span>
                  <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Product &quot;MacBook Pro 2020&quot; marked as sold</span>
                  <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Your Products</h2>
              <div className="flex space-x-2">
                <select className="border rounded px-3 py-2 text-sm">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Sold</option>
                  <option>Inactive</option>
                </select>
                <select className="border rounded px-3 py-2 text-sm">
                  <option>All Categories</option>
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="text-gray-500 text-center py-8">
              <p>No orders yet. Orders will appear here when buyers contact you.</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Most Viewed Products</h3>
                <div className="space-y-2">
                  {products.sort((a, b) => b.views - a.views).slice(0, 3).map((product) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span>{product.title}</span>
                      <span className="text-gray-600">{product.views} views</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Category Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Electronics</span>
                    <span className="text-gray-600">89 views</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Books</span>
                    <span className="text-gray-600">24 views</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Furniture</span>
                    <span className="text-gray-600">15 views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;