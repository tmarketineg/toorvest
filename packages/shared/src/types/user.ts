export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'INVESTOR' | 'COMPANY' | 'ADMIN' | 'GOVERNMENT';
  avatar_url?: string;
  is_verified: boolean;
  created_at: Date;
  country?: { id: string; name: string; code: string; flag_url?: string };
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  token: string;
}
