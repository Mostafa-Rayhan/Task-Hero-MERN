import { toast } from "react-toastify";

 const ToastSuccess = (success) => {
  toast.success(success, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

};
export default ToastSuccess ;
export const ToastError = (error) => {
  toast.error(error, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

};
