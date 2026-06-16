import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const restoreSession = useAuth((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, []);

  return <>{children}</>;
}
