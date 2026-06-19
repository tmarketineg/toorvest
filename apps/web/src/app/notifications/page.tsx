'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, Checks } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const { isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    api.get('/notifications')
      .then((res) => setNotifications(Array.isArray(res.data) ? res.data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const markAsRead = async (ids?: string[]) => {
    try {
      await api.post('/notifications/read', { ids });
      setNotifications(notifications.map(n =>
        ids ? (ids.includes(n.id) ? { ...n, isRead: true } : n) : { ...n, isRead: true }
      ));
    } catch {}
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <Bell weight="light" className="mx-auto mb-4 h-12 w-12 text-[hsl(var(--text-secondary))]" />
        <h1 className="mb-2 text-2xl font-bold">Notifications</h1>
        <p className="text-[hsl(var(--text-secondary))]">
          Please log in to view your notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-[hsl(var(--text-secondary))]">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => markAsRead()}
            className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            <Checks weight="light" className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
              <div className="h-4 w-48 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-64 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-12 text-center">
          <Bell weight="light" className="mx-auto mb-4 h-10 w-10 text-[hsl(var(--text-secondary))]" />
          <p className="text-[hsl(var(--text-secondary))]">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-2xl border p-4 transition-colors ${
                notif.isRead
                  ? 'border-[hsl(var(--border))] bg-[hsl(var(--surface))]'
                  : 'border-brand-200 bg-brand-50/50 dark:border-brand-900 dark:bg-brand-950/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${!notif.isRead ? 'text-brand-700 dark:text-brand-300' : ''}`}>
                    {notif.title}
                  </p>
                  <p className="mt-1 text-sm text-[hsl(var(--text-secondary))]">
                    {notif.message}
                  </p>
                  <p className="mt-2 text-xs text-[hsl(var(--text-secondary))]">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (
                  <button
                    onClick={() => markAsRead([notif.id])}
                    className="shrink-0 rounded-lg p-1 text-brand-600 hover:bg-brand-100 dark:hover:bg-brand-900/30"
                    title="Mark as read"
                  >
                    <Check weight="light" className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
