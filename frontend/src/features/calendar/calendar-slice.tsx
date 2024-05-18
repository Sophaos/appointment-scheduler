import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "features/experts/expert";
import { Period } from "shared/types/calendar-date";
import { getFormattedDate } from "shared/utils/time-utils";

// TODO might be a good idea to use route query params instead for some of these values

interface CalendarState {
  date: string;
  period: Period;
  resources: Expert[] | undefined;
  isMoving: boolean;
}
const initialState: CalendarState = {
  date: getFormattedDate(new Date()),
  period: "day",
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
    setPeriod(state, action) {
      state.period = action.payload;
    },
    setCalendarDateAndPeriod(state, action) {
      state.period = action.payload.period;
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
    selectPeriod: (state) => state.period,
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
    // selectCalendarDateAndPeriod: (state) => ({ date: state.date, period: state.period }),
  },
});

export const { setCalendarDate, setPeriod, setCalendarDateAndPeriod, setResources, setIsMoving } = calendarSlice.actions;
export const { selectCalendarDate, selectPeriod, selectResources, selectDisplayedResources, selectIsMoving, selectCalendarDateAndPeriod } = calendarSlice.selectors;
