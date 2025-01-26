import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slice/userSlice';
import feedReducer from '../Slice/feedSlice';
import taskReducer from '../Slice/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        task: taskReducer,
    }
});