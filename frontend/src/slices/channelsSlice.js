/* eslint-disable no-param-reassign */
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
    addChannel: channelsAdapter.addOne,

    setCurrentChanel: (state, { payload }) => {
      state.currentChannelId = payload;
    },

    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.currentDefaultChannel;
        channelsAdapter.removeOne(state, payload);
      }
    },
    renameChannel: channelsAdapter.updateOne,
  },
});
export const { actions } = channelsSlice;
export const selectorsChannels = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export default channelsSlice.reducer;
