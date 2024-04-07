import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { calendarSlice } from "features/calendar/calendar-slice";
// import { toastMiddleware } from "@/middleware/toast-middleware";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, toastMiddleware),
});
