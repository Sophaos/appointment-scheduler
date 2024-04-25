/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "api/api-slice";
import { Appointment, DEFAULT_APPOINTMENT } from "./appointment";

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
        url: `${BASE_URL}/${request.id}`,
        method: "PATCH",
        body: JSON.stringify({
          id: request.id,
          startTime: request.startTime,
          endTime: request.endTime,
          clientId: request.client.id,
          expertId: request.expert.id,
          serviceId: request.service.id,
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
          clientId: request.client.id,
          expertId: request.expert.id,
          serviceId: request.service.id,
          notes: request.notes,
        }),
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation({
      query: (request) => ({
        url: `${BASE_URL}/${request.id}`,
        method: "DELETE",
        body: JSON.stringify({ id: request.id }),
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

const initialState = {
  isAppointmentDrawerVisible: false,
  appointmentData: DEFAULT_APPOINTMENT,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointmentDrawerVisibility(state, action) {
      state.isAppointmentDrawerVisible = action.payload;
    },
    setAppointmentData(state, action) {
      state.appointmentData = action.payload;
    },
  },
  selectors: {
    selectIsAppointmentDrawerVisible: (state) => state.isAppointmentDrawerVisible,
    selectAppointmentData: (state) => state.appointmentData,
  },
});

export const { setAppointmentDrawerVisibility, setAppointmentData } = appointmentSlice.actions;
export const { selectIsAppointmentDrawerVisible, selectAppointmentData } = appointmentSlice.selectors;

export const { useGetAppointmentsQuery, useUpdateAppointmentMutation, useCreateAppointmentMutation, useDeleteAppointmentMutation } = extendedAppointmentApiSlice;

export const selectAppointmentsResult = extendedAppointmentApiSlice.endpoints.getAppointments.select();

export const selectAppointments = createSelector(selectAppointmentsResult, (appointmentsResult) => appointmentsResult?.data ?? []);
