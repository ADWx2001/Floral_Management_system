import { combineReducers, configureStore}  from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productSlice from './product/productSlice';
import productsReducer from './product/productSlice';
import { productFetch } from './product/productSlice';
import { productsApi } from './product/productApi';
import cartReducer, { getCartTotal } from './cart/cartSlice';

const rootReducer = combineReducers({
    user:userReducer,
    theme:themeReducer,
    product:productSlice,
    products: productsReducer,
    cart : cartReducer,
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
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}).prepend(productsApi.middleware),
});



store.dispatch(productFetch());
store.dispatch(getCartTotal());

export const persistor = persistStore(store); 