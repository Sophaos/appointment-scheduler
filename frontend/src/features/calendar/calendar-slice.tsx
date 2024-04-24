import { createSlice } from "@reduxjs/toolkit";

// TODO might be a good idea to use route query params instead for some of these values
const initialState = {
  // scheduleDate: formatDateToString(new Date())
  scheduleDate: "",
  view: "day",
  resources: [],
  isMoving: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setScheduleDate(state, action) {
      state.scheduleDate = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setScheduleDateAndView(state, action) {
      state.view = action.payload.view;
      state.scheduleDate = action.payload.scheduleDate;
    },
    setResources(state, action) {
      state.resources = action.payload;
    },
    setIsMoving(state, action) {
      state.isMoving = action.payload;
    },
  },
  selectors: {
    selectScheduleDate: (state) => state.scheduleDate,
    selectView: (state) => state.view,
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
  },
});

export const { setScheduleDate, setView, setScheduleDateAndView, setResources, setIsMoving } = calendarSlice.actions;
export const { selectScheduleDate, selectView, selectResources, selectDisplayedResources, selectIsMoving } = calendarSlice.selectors;
