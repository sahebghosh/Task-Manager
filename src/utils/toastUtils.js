import { toast } from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    style: {
      borderRadius: '10px',
      background: '#4caf50',
      color: '#fff',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    style: {
      borderRadius: '10px',
      background: '#f44336',
      color: '#fff',
    },
  });
};
