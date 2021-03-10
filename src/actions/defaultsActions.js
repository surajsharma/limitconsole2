import {
    ADD_DEFAULT,
    // EDIT_DEFAULT,
    // DELETE_DEFAULT,
    ADD_DEFAULT_ERR,
    // EDIT_DEFAULT_ERR,
    // DELETE_DEFAULT_ERR,
    FETCH_DEFAULT,
    FETCH_DEFAULT_ERR,
    IS_LOADING_DEFAULTS,
    FETCH_DEFAULTS,
    FETCH_DEFAULTS_ERR,
} from "../actions/types";

import { getDefault, listDefaults } from "../graphql/queries";

import {
    createDefault,
    updateDefault,
    deleteDefault,
} from "../graphql/mutations";

import { API } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

export const fetchDefault = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: IS_LOADING_DEFAULTS });
            const data = await API.graphql({
                query: getDefault,
                variables: { id: id },
            });
            dispatch({
                type: FETCH_DEFAULT,
                org: data.data.getDefault,
            });
        } catch {
            dispatch({ type: FETCH_DEFAULT_ERR });
        }
    };
};

export const fetchDefaults = (dispatch) => {
    return async (dispatch) => {
        try {
            dispatch({ type: IS_LOADING_DEFAULTS });
            const data = await API.graphql({ query: listDefaults });
            dispatch({
                type: FETCH_DEFAULTS,
                defaults: data.data.listDefaults.items,
            });
        } catch (err) {
            dispatch({ type: FETCH_DEFAULTS_ERR, error: err });
        }
    };
};

export const addDefault = (c, defaults) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING_DEFAULTS });

        const condition = {
            default_condition: c.condition_condition,
            default_high: c.condition_high,
            default_low: c.condition_low,
            default_value: c.condition_value,
            default_message: c.condition_message,
            default_last_updated: new Date().toISOString(),
            default_created: new Date().toISOString(),
            default_id: uuidv4(),
        };

        let newDefaults = defaults;

        newDefaults.push(condition);

        try {
            const data = await API.graphql({
                query: createDefault,
                variables: { input: condition },
            });

            dispatch({
                type: ADD_DEFAULT,
                org: data.data.createDefault,
            });
        } catch (err) {
            dispatch({ type: ADD_DEFAULT_ERR, error: err });
        }
    };
};
