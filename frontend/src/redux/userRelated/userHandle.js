/* eslint-disable no-unused-vars */
import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

// Helper function to determine the base URL
const getBaseURL = () => {
    return process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BASE_URL // Local development.
        : process.env.REACT_APP_RENDER_URL; // Production (Render)
};

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.post(`${baseURL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network Error';
        dispatch(authError(errorMessage));
    }
};

// Register User
export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.post(`${baseURL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else if (result.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network Error';
        dispatch(authError(errorMessage));
    }
};

// Logout User
export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

// Get User Details
export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network Error';
        dispatch(getError(errorMessage));
    }
};

// Delete User
export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry, the delete function has been disabled for now."));
};

// Update User
export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.put(`${baseURL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network Error';
        dispatch(getError(errorMessage));
    }
};

// Add Stuff
export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.post(`${baseURL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Network Error';
        dispatch(authError(errorMessage));
    }
};