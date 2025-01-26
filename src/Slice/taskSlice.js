import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    taskData: [],
    loading: false,
  },
  reducers: {
    setTask: (state, action) => {
      state.taskData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    removeTask: (state, action) => {
      state.taskData = state.taskData.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTask, setLoading, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
