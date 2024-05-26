import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "features/experts/expert";
import { getFormattedDate } from "shared/utils/time-utils";

interface CalendarState {
  date: string;
  resources: Expert[] | undefined;
  isMoving: boolean;
}
const initialState: CalendarState = {
  date: getFormattedDate(new Date()),
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
    setCalendarDateAndView(state, action) {
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
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
  },
});

export const { setCalendarDate, setCalendarDateAndView, setResources, setIsMoving } = calendarSlice.actions;
export const { selectCalendarDate, selectResources, selectDisplayedResources, selectIsMoving } = calendarSlice.selectors;
