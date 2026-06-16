export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'BID_RESPONSE' | 'BID_ACCEPTED' | 'NEW_ARTICLE' | 'SYSTEM';
  is_read: boolean;
  link?: string;
  created_at: Date;
}

export interface NotificationCount {
  count: number;
}
