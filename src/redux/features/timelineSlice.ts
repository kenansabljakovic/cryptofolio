import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TimelineItem = {
  id: number;
  days: string;
  display: string;
  active: boolean;
};

type TimelineState = {
  currentTimeline: TimelineItem;
  timeline: TimelineItem[];
};

const initialState: TimelineState = {
  currentTimeline: {
    id: 1,
    days: '1',
    display: '1D',
    active: true,
  },
  timeline: [
    {
      id: 1,
      days: '1',
      display: '1D',
      active: true,
    },
    { id: 2, days: '7', display: '7D', active: false },
    {
      id: 3,
      days: '14',
      display: '14D',
      active: false,
    },
    {
      id: 4,
      days: '30',
      display: '1M',
      active: false,
    },
    {
      id: 5,
      days: '90',
      display: '3M',
      active: false,
    },
    {
      id: 6,
      days: '180',
      display: '6M',
      active: false,
    },
    {
      id: 7,
      days: '365',
      display: '1Y',
      active: false,
    },
    {
      id: 8,
      days: 'max',
      display: 'MAX',
      active: false,
    },
  ],
};

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    activeTimeline: (state, action: PayloadAction<number>) => {
      const currentActiveIndex = state.timeline.findIndex((item) => item.active);
      if (currentActiveIndex !== -1) {
        state.timeline[currentActiveIndex].active = false;
      }

      const newActiveIndex = state.timeline.findIndex((item) => item.id === action.payload);
      if (newActiveIndex !== -1) {
        state.timeline[newActiveIndex].active = true;
        state.currentTimeline = { ...state.timeline[newActiveIndex] };
      }
    },
  },
});

export const { activeTimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
