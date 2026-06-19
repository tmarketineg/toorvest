'use client';

import { useEffect, useState } from 'react';
import { Shield, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  country?: { name: string };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users?limit=50')
      .then((res) => setUsers(res.data?.data || res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Users</h2>

      <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Verified</th>
              <th className="px-4 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><div className="h-4 w-32 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-4 animate-pulse rounded bg-gray-200" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-20 animate-pulse rounded bg-gray-200" /></td>
                </tr>
              ))
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[hsl(var(--text-secondary))]">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="bg-[hsl(var(--surface))] transition-colors hover:bg-[hsl(var(--surface-elevated))]">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-xs text-[hsl(var(--text-secondary))]">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      user.role === 'ADMIN' ? 'bg-red-50 text-red-700' :
                      user.role === 'COMPANY' ? 'bg-blue-50 text-blue-700' :
                      user.role === 'GOVERNMENT' ? 'bg-purple-50 text-purple-700' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {user.role === 'ADMIN' && <ShieldCheck weight="light" className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {user.country?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    {user.isVerified ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[hsl(var(--text-secondary))]">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
