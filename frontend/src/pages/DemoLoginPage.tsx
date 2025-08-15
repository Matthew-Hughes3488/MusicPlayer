import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../types';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';

export default function DemoLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Simple demo authentication - bypass for presentation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const demoUser: User = {
        user_id: email === 'admin@example.com' ? 1 : 2,
        email,
        role: email === 'admin@example.com' ? 'admin' : 'user'
      };
      
      // Store in localStorage for demo
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      localStorage.setItem('demo_token', 'demo_token_' + demoUser.user_id);
      setUser(demoUser);
    }
  };

  if (user) {
    return <Navigate to="/search" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MusicalNoteIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Music Player</h1>
          <p className="text-gray-600 mt-2">Sign in to access your music</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Regular user: user@example.com</p>
            <p>• Admin user: admin@example.com</p>
            <p>• Password: any password</p>
          </div>
        </div>
      </div>
    </div>
  );
}