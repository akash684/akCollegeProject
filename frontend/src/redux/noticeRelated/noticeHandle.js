import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    // Determine the base URL based on the environment
    const baseURL = process.env.NODE_ENV === 'development' 
        ? process.env.REACT_APP_BASE_URL 
        : process.env.REACT_APP_RENDER_URL;

    try {
        const result = await axios.get(`${baseURL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
};