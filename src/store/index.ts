import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './trip/tripslice'; // Import the tripSlice reducer
import  bookReducer  from './book/bookslice';
import adminReducer from './admin/Admin.slice';

const store = configureStore({
  reducer: {
    trip: tripReducer,
    book:bookReducer ,
    admin:adminReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
