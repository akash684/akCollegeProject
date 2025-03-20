import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

// Optional: Add custom middleware for logging in development
const customMiddleware = (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
        // Add logging middleware only in development
        middleware.push(store => next => action => {
            console.log('Dispatching action:', action);
            return next(action);
        });
    }
    return middleware;
};

const store = configureStore({
    reducer: {
        user: userReducer,
        student: studentReducer,
        teacher: teacherReducer,
        notice: noticeReducer,
        complain: complainReducer,
        sclass: sclassReducer
    },
    middleware: customMiddleware, // Use custom middleware
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;