/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { Appointment } from "./appointment";

const BASE_URL = "appointments";
export const extendedAppointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query<Appointment[], void>({
      query: () => ({
        url: BASE_URL,
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "PATCH",
        body: JSON.stringify({
          id: request.id,
          startTime: request.startTime,
          endTime: request.endTime,
          clientId: request.clientId,
          expertId: request.expertId,
          serviceId: request.serviceId,
          notes: request.notes,
        }),
      }),
      invalidatesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "POST",
        body: JSON.stringify({
          startTime: request.startTime,
          endTime: request.endTime,
          clientId: request.clientId,
          expertId: request.expertId,
          serviceId: request.serviceId,
          notes: request.notes,
        }),
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (request) => ({
        url: BASE_URL,
        method: "DELETE",
        body: JSON.stringify({ scheduleDate: request.scheduleDate, appointmentId: request.appointmentId }),
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
