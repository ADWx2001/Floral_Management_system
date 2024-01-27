import { combineReducers, configureStore}  from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './product/productSlice';
import { productFetch } from './product/productSlice';
import { productsApi } from './product/productApi';

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer,
    products: productsReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    });

const persistConfig = {
    key: 'root',
    version : 1,
    storage,

}

const persistedReducer = persistReducer (persistConfig , rootReducer);

export const store = configureStore({
    reducer :persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(productsApi.middleware),
});

store.dispatch(productFetch());
export const persistor = persistStore(store); 