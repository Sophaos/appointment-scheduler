import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { appointmentSlice } from "features/appointments/appointment-slice";
import { calendarSlice } from "features/calendar/calendar-slice";
import { clientSlice } from "features/clients/client-slice";
import { expertSlice } from "features/experts/expert-slice";
import { serviceSlice } from "features/services/service-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    calendar: calendarSlice.reducer,
    appointment: appointmentSlice.reducer,
    client: clientSlice.reducer,
    service: serviceSlice.reducer,
    expert: expertSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
