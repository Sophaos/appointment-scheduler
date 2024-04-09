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
  appointmentModalOpen: false,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentModalOpen(state, action) {
      state.appointmentModalOpen = action.payload;
    },
  },
  selectors: {
    selectAppointmentModalOpen: (state) => state.appointmentModalOpen,
  },
});

export const { setAppointmentModalOpen } = appointmentSlice.actions;
export const { selectAppointmentModalOpen } = appointmentSlice.selectors;

export const { useGetAppointmentsQuery, useUpdateAppointmentMutation, useCreateAppointmentMutation, useDeleteAppointmentMutation } = extendedAppointmentApiSlice;
