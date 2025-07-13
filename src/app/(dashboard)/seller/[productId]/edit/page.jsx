'use client'
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { productId } = useParams();
  const router = useRouter();

  // Replace this with your fetch logic
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    // ...other fields
  });

  useEffect(() => {
    // Fetch product details by productId and setForm
    // Example:
    // fetch(`/api/products/${productId}`).then(res => res.json()).then(data => setForm(data));
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated product data
    // Example: fetch(`/api/products/${productId}`, { method: 'PUT', body: JSON.stringify(form) })
    alert('Product updated!');
    router.push(`/seller/${productId}`);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          required
        />
        {/* Add more fields as needed */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}