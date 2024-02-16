/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,

    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },

    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids[0];
        state.currentChannelId = newCurrentChannelId;
        channelsAdapter.removeOne(state, payload);
      }
    },
    renameChannel: channelsAdapter.updateOne,
  },
});
export const {
  addChannel, addChannels, removeChannel, renameChannel, setCurrentChannel,
} = channelsSlice.actions;
export const selectorsChannels = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export default channelsSlice.reducer;
