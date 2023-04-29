import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  task: {},
};

const taskSlice = createSlice({
  name: "taskslice",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = [...action.payload];
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    deleteTask: (state, action) => {
      let task = action.payload;
      state.tasks = state.tasks.filter((t) => t._id !== task._id);
    },
  },
});

export const { setTasks, setTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
