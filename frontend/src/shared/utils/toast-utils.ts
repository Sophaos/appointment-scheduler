import { toast } from "react-toastify";

export const baseQueryToast = <T>(queryFulfilled: Promise<T>, successMessage: string, errorMessage: string = "An error has occured.") => {
  toast.promise(queryFulfilled, {
    pending: {
      render() {
        return "Processing...";
      },
    },
    success: {
      render() {
        return successMessage;
      },
    },
    error: {
      render() {
        return errorMessage;
      },
    },
  });
};
