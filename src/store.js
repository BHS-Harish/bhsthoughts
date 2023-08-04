import {configureStore} from '@reduxjs/toolkit';
import AuthSlice from './Slices/AuthSlice';
import CategorySlice from './Slices/CategorySlice';
import BlogSlice from './Slices/BlogSlice';
import thunk from 'redux-thunk';
export const store=configureStore({
    reducer:{
        "Auth":AuthSlice,
        "Category":CategorySlice,
        "Blogs":BlogSlice
    },
    middleware:[thunk]
})