/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";

const BASE_URL = "appointments";
export const extendedAppointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<any, void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation({
      query: ({ form }) => ({
        url: BASE_URL,
        method: "PATCH",
        body: JSON.stringify({
          appointmentId: form.appointmentId,
          scheduleDate: form.scheduleDate,
          timeBegin: form.timeBegin,
          clientId: form.clientId,
          appointmentNote: form.appointmentNote,
          timeEnd: form.timeEnd,
          serviceIdList: form.serviceIdList,
          serviceNameList: form.serviceNameList,
          servicesForClient: form.servicesForClient,
        }),
      }),
      invalidatesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation({
      query: ({ form }) => ({
        url: BASE_URL,
        method: "POST",
        body: JSON.stringify({
          scheduleDate: form.scheduleDate,
          timeBegin: form.timeBegin,
          clientId: form.clientId,
          appointmentNote: form.appointmentNote,
          timeEnd: form.timeEnd,
          serviceIdList: form.serviceIdList,
          serviceNameList: form.serviceNameList,
          servicesForClient: form.servicesForClient,
        }),
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: ({ form }) => ({
        url: BASE_URL,
        method: "DELETE",
        body: JSON.stringify({ scheduleDate: form.scheduleDate, appointmentId: form.appointmentId }),
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

const initialState = {
  isAppointmentDrawerVisible: false,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentDrawerVisibility(state, action) {
      state.isAppointmentDrawerVisible = action.payload;
    },
  },
  selectors: {
    selectIsAppointmentDrawerVisible: (state) => state.isAppointmentDrawerVisible,
  },
});

export const { setAppointmentDrawerVisibility } = appointmentSlice.actions;
export const { selectIsAppointmentDrawerVisible } = appointmentSlice.selectors;

export const { useGetAppointmentsQuery, useUpdateAppointmentMutation, useCreateAppointmentMutation, useDeleteAppointmentMutation } = extendedAppointmentApiSlice;
