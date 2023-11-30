import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  currentDefaultChannel: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
  },
});
export const { actions } = channelsSlice;
export const selectorsChannels = channelsAdapter.getSelectors(
  (state) => state.channels
);
export default channelsSlice.reducer;
