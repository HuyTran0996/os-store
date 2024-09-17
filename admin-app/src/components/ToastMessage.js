import { toast } from "react-toastify";

export const showToast = (message, type = "success", duration) => {
  const options = {
    autoClose: duration || 1800,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warn":
      toast.warn(message, options);
      break;
    default:
      toast.success(message, options);
  }
};
