import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function BookLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">ESTEE CITY</span>
                <span className="text-xl font-bold text-primary-600"> BEAUTY</span>
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-10 w-72 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse" />
        <div className="h-5 w-64 bg-gray-200 rounded-lg mx-auto mb-10 animate-pulse" />

        {/* Progress steps skeleton */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              {i < 4 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
