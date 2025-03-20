import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

// Helper function to determine the base URL
const getBaseURL = () => {
    return process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BASE_URL // Local development
        : process.env.REACT_APP_RENDER_URL; // Production (Render)
};

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/Sclass/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/FreeSubjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    try {
        const baseURL = getBaseURL();
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};