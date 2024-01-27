import { combineReducers, configureStore}  from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import productsReducer from './product/productSlice';
import { productFetch } from './product/productSlice';

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer,
    products: productsReducer,
    });

const persistConfig = {
    key: 'root',
    version : 1,
    storage,

}

const persistedReducer = persistReducer (persistConfig , rootReducer);

export const store = configureStore({
    reducer :persistedReducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({

        serializableCheck : false,

    }),
});

store.dispatch(productFetch());
export const persistor = persistStore(store); 