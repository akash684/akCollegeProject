import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

// Helper function to determine the base URL
const getBaseURL = () => {
    return process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BASE_URL // Local development
        : process.env.REACT_APP_RENDER_URL; // Production (Render)
};

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.put(`${baseURL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.put(`${baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(stuffDone());
        }
    } catch (error) {
        dispatch(getError(error));
    }
};