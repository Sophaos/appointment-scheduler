import { apiSlice } from "api/api-slice";

export const extendedAppointmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: (request) => ({
        url: "/api/read-appointments",
        method: "POST",
        body: JSON.stringify({
          scheduleDate: request.scheduleDate,
        }),
      }),
      providesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation({
      query: ({ form }) => ({
        url: "/api/update-appointment",
        method: "POST",
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
        url: "/api/create-appointment",
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
        url: "/api/delete-appointment",
        method: "POST",
        body: JSON.stringify({ scheduleDate: form.scheduleDate, appointmentId: form.appointmentId }),
      }),
      invalidatesTags: ["Appointments"],
    }),
  }),
});

export const { useGetAppointmentsQuery, useUpdateAppointmentMutation, useCreateAppointmentMutation, useDeleteAppointmentMutation } = extendedAppointmentApiSlice;
