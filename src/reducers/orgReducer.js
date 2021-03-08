import {
    FETCH_ORGS,
    FETCH_ORGS_ERR,
    NEW_ORG,
    NEW_ORG_ERR,
    UPDATE_ORG,
    UPDATE_ORG_ERR,
    DELETE_ORG,
    DELETE_ORG_ERR,
    FETCH_ORG,
    FETCH_ORG_ERR,
    ADD_SKU,
    ADD_SKU_ERR,
    DELETE_SKU,
    DELETE_SKU_ERR,
    IS_LOADING,
    UPDATE_SKU,
    UPDATE_SKU_ERR,
    ADD_PARAM,
    ADD_PARAM_ERR,
    UPDATE_PARAM,
    UPDATE_PARAM_ERR,
    DELETE_PARAM,
    DELETE_PARAM_ERR,
    ADD_INSIGHT,
    ADD_INSIGHT_ERR,
    UPDATE_INSIGHT,
    UPDATE_INSIGHT_ERR,
    DELETE_INSIGHT,
    DELETE_INSIGHT_ERR,
    ADD_UPDATE,
    ADD_UPDATE_ERR,
    UPDATE_UPDATE,
    UPDATE_UPDATE_ERR,
    DELETE_UPDATE,
    DELETE_UPDATE_ERR,
    FETCH_SKU,
    ADD_CUSTOMER,
    EDIT_CUSTOMER,
    DELETE_CUSTOMER,
    FETCH_CUSTOMER,
    ADD_CONDITION,
    EDIT_CONDITION,
    DELETE_CONDITION,
    ADD_PROMOTION,
    DELETE_PROMOTION,
    EDIT_PROMOTION,
} from "../actions/types";

const initialState = {
    orgs: [],
    org: {},
    loadedCustomer: {},
    loadedOrg: {},
    loadedSku: {},
    error: null,
    loading: true,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return { ...state, loading: true };
        case FETCH_ORGS:
            return { ...state, orgs: action.orgs, loading: false };
        case FETCH_ORGS_ERR:
            return { ...state, error: action.error, loading: false };
        case FETCH_ORG:
            return { ...state, loadedOrg: action.org, loading: false };
        case FETCH_ORG_ERR:
            return { ...state, error: action.error, loading: false };
        case FETCH_SKU:
            return {
                ...state,
                loadedSku: action.sku,
                loading: false,
                loadedOrg: action.org,
            };
        case NEW_ORG:
            return { ...state, org: action.org };
        case NEW_ORG_ERR:
            return { ...state, error: action.error };
        case UPDATE_ORG:
            return { ...state, org: action.org };
        case UPDATE_ORG_ERR:
            return { ...state, error: action.error };
        case ADD_SKU:
            return { ...state, org: action.org };
        case ADD_SKU_ERR:
            return { ...state, error: action.error };
        case DELETE_ORG:
            return { ...state, org: action.org };
        case DELETE_ORG_ERR:
            return { ...state, error: action.error };
        case DELETE_SKU:
            return { ...state, org: action.org };
        case DELETE_SKU_ERR:
            return { ...state, error: action.error };
        case UPDATE_SKU:
            return { ...state, org: action.org };
        case UPDATE_SKU_ERR:
            return { ...state, error: action.error };
        case ADD_PARAM:
            return { ...state, org: action.org };
        case ADD_PARAM_ERR:
            return { ...state, error: action.error };
        case UPDATE_PARAM:
            return { ...state, org: action.org };
        case UPDATE_PARAM_ERR:
            return { ...state, error: action.error };
        case DELETE_PARAM:
            return { ...state, org: action.org };
        case DELETE_PARAM_ERR:
            return { ...state, error: action.error };
        case ADD_INSIGHT:
            return { ...state, org: action.org };
        case ADD_INSIGHT_ERR:
            return { ...state, error: action.error };
        case UPDATE_INSIGHT:
            return { ...state, org: action.org };
        case UPDATE_INSIGHT_ERR:
            return { ...state, error: action.error };
        case DELETE_INSIGHT:
            return { ...state, org: action.org };
        case DELETE_INSIGHT_ERR:
            return { ...state, error: action.error };
        case ADD_UPDATE:
            return { ...state, org: action.org };
        case ADD_UPDATE_ERR:
            return { ...state, error: action.error };
        case UPDATE_UPDATE:
            return { ...state, org: action.org };
        case UPDATE_UPDATE_ERR:
            return { ...state, error: action.error };
        case DELETE_UPDATE:
            return { ...state, org: action.org };
        case DELETE_UPDATE_ERR:
            return { ...state, error: action.error };
        case ADD_CUSTOMER:
            return {
                ...state,
                org: action.org,
                loadedSku: action.sku,
                loading: action.loading,
            };
        case EDIT_CUSTOMER:
            return { ...state, org: action.org, loadedSku: action.sku };
        case DELETE_CUSTOMER:
            return { ...state, org: action.org, loadedSku: action.sku };
        case FETCH_CUSTOMER:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case ADD_CONDITION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case EDIT_CONDITION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case DELETE_CONDITION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case ADD_PROMOTION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case EDIT_PROMOTION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        case DELETE_PROMOTION:
            return {
                ...state,
                loadedSku: action.sku,
                loadedCustomer: action.customer,
                loading: false,
                loadedOrg: action.org,
            };
        default:
            return state;
    }
};

export default rootReducer;
