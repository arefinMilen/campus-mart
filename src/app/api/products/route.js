import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

// Helper to read products
async function readProducts() {
  try {
    const data = await fs.promises.readFile(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File does not exist, return empty array
      return [];
    }
    throw error;
  }
}

// Helper to write products
async function writeProducts(products) {
  // Ensure the directory exists
  const dir = path.dirname(productsFilePath);
  await fs.promises.mkdir(dir, { recursive: true });
  await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const productData = {};

    for (const [key, value] of formData.entries()) {
      if (key === 'images') {
        if (!productData.images) {
          productData.images = [];
        }
        // For mock, store a placeholder or base64 if needed, for now just name
        productData.images.push(value.name); 
      } else {
        productData[key] = value;
      }
    }

    // Assign a unique ID and timestamp
    productData.id = Date.now();
    productData.timePosted = 'just now'; // Or format a real date
    productData.rating = 0; // Default rating
    productData.reviews = 0; // Default reviews
    productData.originalPrice = parseFloat(productData.price) * 1.2; // Mock original price

    const products = await readProducts();
    products.push(productData);
    await writeProducts(products);

    console.log('Product added and saved:', productData);

    return NextResponse.json({ message: 'Product listed successfully', product: productData }, { status: 200 });
  } catch (error) {
    console.error('Error processing product submission:', error);
    return NextResponse.json({ message: 'Failed to list product', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ message: 'Failed to fetch products', error: error.message }, { status: 500 });
  }
}
