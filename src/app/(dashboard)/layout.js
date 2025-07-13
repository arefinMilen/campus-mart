import Link from 'next/link';

export default function DashboardMenu({ children }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/seller" className="text-blue-600 hover:underline">Seller Dashboard</Link>
        </li>
        <li>
          <Link href="/buyer" className="text-blue-600 hover:underline">Buyer Dashboard</Link>
        </li>
      </ul>
      {children}
    </div>
  );
}
