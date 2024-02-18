import { toast, Bounce, ToastOptions } from 'react-toastify';

type ToastState = 'error' | 'success' | 'info' | 'warn';

const showToast = (state: ToastState, message: string) => {
  const toastObj: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    transition: Bounce,
  };

  switch (state) {
    case 'error':
      toast.error(message, toastObj);
      break;
    case 'success':
      toast.success(message, toastObj);
      break;
    case 'info':
      toast.info(message, toastObj);
      break;
    case 'warn':
      toast.warn(message, toastObj);
      break;
    default:
      toast.info('', toastObj);
  }
};

export default showToast;
