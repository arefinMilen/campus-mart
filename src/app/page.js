"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User, Star, MapPin, Clock } from "lucide-react";
import React from "react";
import { useCart } from "@/app/components/CartContext";

// Mock data for demonstration
const featuredProducts = [
  {
    id: 1,
    title: "Engineering Textbook Bundle",
    price: 2500,
    originalPrice: 4000,
    image: "/iphone.jpg",
    seller: "Ahmed Hassan",
    rating: 4.8,
    reviews: 24,
    category: "Books",
    location: "Dhaka University",
    timePosted: "2 hours ago",
  },
  {
    id: 2,
    title: "iPhone 13 Pro Max",
    price: 85000,
    originalPrice: 95000,
    image: "/api/placeholder/300/200",
    seller: "Fatima Khan",
    rating: 4.9,
    reviews: 12,
    category: "Electronics",
    location: "BUET",
    timePosted: "5 hours ago",
  },
  {
    id: 3,
    title: "Study Desk & Chair Set",
    price: 8500,
    originalPrice: 12000,
    image: "/api/placeholder/300/200",
    seller: "Rashid Ahmed",
    rating: 4.7,
    reviews: 8,
    category: "Furniture",
    location: "NSU",
    timePosted: "1 day ago",
  },
  {
    id: 4,
    title: "Laptop Stand + Accessories",
    price: 1200,
    originalPrice: 1800,
    image: "/api/placeholder/300/200",
    seller: "Nadia Islam",
    rating: 4.6,
    reviews: 15,
    category: "Electronics",
    location: "Dhaka University",
    timePosted: "3 hours ago",
  },
];

const categories = [
  { name: "Books", icon: "📚", count: 1247 },
  { name: "Electronics", icon: "💻", count: 856 },
  { name: "Furniture", icon: "🪑", count: 423 },
  { name: "Fashion", icon: "👕", count: 678 },
  { name: "Sports", icon: "⚽", count: 234 },
  { name: "Others", icon: "🎯", count: 345 },
];

export default function HomePage() {
  const { cart, addToCart } = useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                <ShoppingCart className="h-6 w-6" />
                {/* <span className="absolute -top-1 p-1 m-1 bg-red-500 text-white text-xs rounded-full h-5 w-5">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span> */}
                Campus Mart
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for products, books, electronics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <Link href="/Cart" className="relative p-2 text-gray-600 hover:text-blue-600">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </Link>
              <button className="p-2 text-gray-600 hover:text-blue-600">
                <User className="h-6 w-6" />
              </button>
              <Link
                href="/sell"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Buy & Sell Within Your
            <span className="text-yellow-400"> Campus</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with fellow students to buy and sell textbooks, electronics,
            furniture, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/sell"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {product.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    {product.timePosted}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ৳{product.originalPrice}
                      </span>
                    </div>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                2,500+
              </div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                15,000+
              </div>
              <div className="text-gray-600">Products Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Campus Mart</h3>
              <p className="text-gray-400">
                Connecting students for seamless buying and selling within
                university campuses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products" className="hover:text-white">
                    Browse Products
                  </Link>
                </li>
                <li>
                  <Link href="/sell" className="hover:text-white">
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/books" className="hover:text-white">
                    Books
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/electronics"
                    className="hover:text-white"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/furniture" className="hover:text-white">
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link href="/category/fashion" className="hover:text-white">
                    Fashion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white">
                    Safety Tips
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campus Mart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
