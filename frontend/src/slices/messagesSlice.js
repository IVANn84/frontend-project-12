import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});
export const { actions } = messagesSlice;
export const selectorsMessage = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
