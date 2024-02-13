import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducer/dashboard';
import vocabReducer from './reducer/vocab';
import vocabTrainerReducer from './reducer/vocabTrainer';

const store = configureStore({
  reducer: {
    dashboardReducer,
    vocabReducer,
    vocabTrainerReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
