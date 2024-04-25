import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "features/experts/expert";

// TODO might be a good idea to use route query params instead for some of these values

interface CalendarState {
  scheduleDate: string;
  view: string;
  resources: Expert[] | undefined;
  isMoving: boolean;
}
const initialState: CalendarState = {
  scheduleDate: new Date().toISOString(),
  view: "day",
  resources: [],
  isMoving: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarDate(state, action) {
      state.scheduleDate = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setCalendarDateAndView(state, action) {
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
    selectCalendarDate: (state) => state.scheduleDate,
    selectView: (state) => state.view,
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
  },
});

export const { setCalendarDate, setView, setCalendarDateAndView, setResources, setIsMoving } = calendarSlice.actions;
export const { selectCalendarDate, selectView, selectResources, selectDisplayedResources, selectIsMoving } = calendarSlice.selectors;
