import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

console.log(store.getState());

export const persistor = persistStore(store);