import { createSlice } from "@reduxjs/toolkit";
import { Expert } from "features/experts/expert";

interface CalendarState {
  resources: Expert[] | undefined;
  isMoving: boolean;
}
const initialState: CalendarState = {
  resources: [],
  isMoving: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setResources(state, action) {
      state.resources = action.payload;
    },
    setIsMoving(state, action) {
      state.isMoving = action.payload;
    },
  },
  selectors: {
    selectResources: (state) => state.resources,
    selectDisplayedResources: (state) => (state.resources.length > 0 ? state.resources : undefined),
    selectIsMoving: (state) => state.isMoving,
  },
});

export const { setResources, setIsMoving } = calendarSlice.actions;
export const { selectResources, selectDisplayedResources, selectIsMoving } = calendarSlice.selectors;
