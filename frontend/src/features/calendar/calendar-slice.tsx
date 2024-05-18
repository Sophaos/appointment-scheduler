import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "features/experts/expert";
import { View } from "shared/types/calendar-date";
import { getFormattedDate } from "shared/utils/time-utils";

// TODO might be a good idea to use route query params instead for some of these values

interface CalendarState {
  date: string;
  view: View;
  resources: Expert[] | undefined;
  isMoving: boolean;
}
const initialState: CalendarState = {
  date: getFormattedDate(new Date()),
  view: "day",
  resources: [],
  isMoving: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarDate(state, action) {
      state.date = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setCalendarDateAndView(state, action) {
      state.view = action.payload.view;
      state.date = action.payload.date;
    },
    setResources(state, action) {
      state.resources = action.payload;
    },
    setIsMoving(state, action) {
      state.isMoving = action.payload;
    },
  },
  selectors: {
    selectCalendarDate: (state) => state.date,
    selectView: (state) => state.view,
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
    // selectCalendarDateAndView: (state) => ({ date: state.date, view: state.view }),
  },
});

export const { setCalendarDate, setView, setCalendarDateAndView, setResources, setIsMoving } = calendarSlice.actions;
export const { selectCalendarDate, selectView, selectResources, selectDisplayedResources, selectIsMoving } = calendarSlice.selectors;
