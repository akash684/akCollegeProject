import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    postDone,
    doneSuccess
} from './teacherSlice';

// Helper function to determine the base URL
const getBaseURL = () => {
    return process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BASE_URL // Local development
        : process.env.REACT_APP_RENDER_URL; // Production (Render)
};

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        await axios.put(`${baseURL}/TeacherSubject`, { teacherId, teachSubject }, {
            headers: { 'Content-Type': 'application/json' },
        });
        dispatch(postDone());
    } catch (error) {
        dispatch(getError(error));
    }
};