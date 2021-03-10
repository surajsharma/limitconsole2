import {
    ADD_DEFAULT,
    EDIT_DEFAULT,
    DELETE_DEFAULT,
    ADD_DEFAULT_ERR,
    EDIT_DEFAULT_ERR,
    DELETE_DEFAULT_ERR,
    FETCH_DEFAULT,
    FETCH_DEFAULT_ERR,
    FETCH_DEFAULTS,
    FETCH_DEFAULTS_ERR,
} from "../actions/types";

const initialState = {
    default: null,
    defaults: [],
    error: null,
    loading: true,
};

const defaultsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEFAULT:
            return { ...state, default: action.default, loading: false };
        case FETCH_DEFAULT_ERR:
            return { ...state, error: action.error, loading: false };
        case FETCH_DEFAULTS:
            return { ...state, defaults: action.defaults, loading: false };
        case FETCH_DEFAULTS_ERR:
            return { ...state, error: action.error, loading: false };
        case ADD_DEFAULT:
            return { ...state, defaults: action.defaults };
        case ADD_DEFAULT_ERR:
            return { ...state, error: action.error };
        case EDIT_DEFAULT:
            return { ...state, defaults: action.defaults };
        case EDIT_DEFAULT_ERR:
            return { ...state, error: action.error };
        case DELETE_DEFAULT:
            return { ...state, defaults: action.defaults };
        case DELETE_DEFAULT_ERR:
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default defaultsReducer;
