import { ActionCreatorWithPayload, ActionFromReducer, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// TODO: might use rtk middleware instead
export const toastMiddleware: Middleware = () => (next) => (action) => {
  if (action.type.endsWith("pending")) {
    // Show a toast for pending actions if needed
  } else if (action.type.endsWith("fulfilled")) {
    // const message = action?.payload?.message;
    // if (message && message.length > 0) {
    //   toast.success(message);
    // }
    toast.success("Success");
  }
  if (action.type.endsWith("rejected")) {
    // Show an error toast for rejected actions
    const message = action.meta?.arg?.endpointName;
    if (message && message.length > 0) {
      toast.error(`An error occured for the following endpoint: ${message} (${action.payload.error})`);
    }
  }

  return next(action);
};
