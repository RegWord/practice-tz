import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationOptions {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
}

export const NotificationManager = {
  show: (type: NotificationType, options: NotificationOptions) => {
    const { message, description = '', placement = 'topRight', duration = 4.5 } = options;
    
    notification[type]({
      message,
      description,
      placement,
      duration
    });
  },
  
  success: (options: NotificationOptions) => {
    NotificationManager.show('success', options);
  },
  
  error: (options: NotificationOptions) => {
    NotificationManager.show('error', options);
  },
  
  info: (options: NotificationOptions) => {
    NotificationManager.show('info', options);
  },
  
  warning: (options: NotificationOptions) => {
    NotificationManager.show('warning', options);
  }
};