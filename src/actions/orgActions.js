import {
    FETCH_ORGS,
    FETCH_ORGS_ERR,
    NEW_ORG_ERR,
    NEW_ORG,
    UPDATE_ORG,
    UPDATE_ORG_ERR,
    DELETE_ORG,
    DELETE_ORG_ERR,
    FETCH_ORG,
    FETCH_ORG_ERR,
    ADD_SKU,
    ADD_SKU_ERR,
    IS_LOADING,
    DELETE_SKU,
    DELETE_SKU_ERR,
    UPDATE_SKU,
    UPDATE_SKU_ERR,
    ADD_PARAM,
    ADD_PARAM_ERR,
    DELETE_PARAM,
    DELETE_PARAM_ERR,
    UPDATE_PARAM,
    UPDATE_PARAM_ERR,
    ADD_INSIGHT,
    ADD_INSIGHT_ERR,
    DELETE_INSIGHT,
    DELETE_INSIGHT_ERR,
    UPDATE_INSIGHT,
    UPDATE_INSIGHT_ERR,
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

import { listOrgs, getOrg } from "../graphql/queries";
import { createOrg, updateOrg, deleteOrg } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

export const fetchOrg = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: IS_LOADING });
            const data = await API.graphql({
                query: getOrg,
                variables: { id: id },
            });
            dispatch({
                type: FETCH_ORG,
                org: data.data.getOrg,
            });
        } catch (err) {
            dispatch({ type: FETCH_ORG_ERR, error: err });
        }
    };
};

export const fetchOrgs = (dispatch) => {
    return async (dispatch) => {
        try {
            dispatch({ type: IS_LOADING });
            const data = await API.graphql({ query: listOrgs });
            dispatch({
                type: FETCH_ORGS,
                orgs: data.data.listOrgs.items,
            });
        } catch (err) {
            dispatch({ type: FETCH_ORGS_ERR, error: err });
        }
    };
};

export const createNewOrg = (postData) => {
    return async (dispatch) => {
        const post = {
            org_name: postData.org_name,
            org_id: postData.org_id,
        };

        try {
            const data = await API.graphql({
                query: createOrg,
                variables: { input: post },
            });

            dispatch({
                type: NEW_ORG,
                org: data.data.newOrg,
            });
        } catch (err) {
            dispatch({ type: NEW_ORG_ERR, error: err });
        }
    };
};

export const fetchAnSku = (index, org) => {
    return (dispatch) =>
        dispatch({ type: FETCH_SKU, org: org, sku: org.org_skus[index] });
};

export const updateSku = (sku, postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const sku_id = sku.sku_id;
        let skus = org.org_skus;

        //find by original ID as the user may have changed the ID

        const index = skus.findIndex(function (i) {
            return i.sku_id === sku_id;
        });

        skus[index].sku_id = postData.sku_id;
        skus[index].sku_number = postData.sku_number;
        skus[index].sku_description = postData.sku_description;
        skus[index].sku_last_updated = postData.sku_last_updated;

        const variables = {
            input: {
                id: org.id,
                org_skus: skus && skus.length ? [...skus] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: UPDATE_SKU,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: UPDATE_SKU_ERR, error: err });
        }
    };
};

export const delSku = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const { sku_id } = postData;
        const skus = org.org_skus;

        skus.splice(
            skus.findIndex(function (i) {
                return i.id === sku_id;
            }),
            1
        );

        const variables = {
            input: {
                id: org.id,
                org_skus: skus && skus.length ? [...skus] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: DELETE_SKU,
                org: data.data.updateOrg,
                loadedSku: null,
            });
        } catch (err) {
            dispatch({ type: DELETE_SKU_ERR, error: err });
        }
    };
};

export const addSku = (postData, org) => {
    const { sku_id, sku_number, sku_description } = postData;
    const variables = {
        input: {
            id: org.id,
            org_skus:
                org.org_skus && org.org_skus.length
                    ? [
                          ...org.org_skus,
                          {
                              id: uuidv4(),
                              sku_id: sku_id,
                              sku_number: sku_number,
                              sku_description: sku_description,
                              sku_last_updated: new Date().toISOString(),
                              sku_created: new Date().toISOString(),
                          },
                      ]
                    : {
                          id: uuidv4(),
                          sku_id: sku_id,
                          sku_number: sku_number,
                          sku_description: sku_description,
                          sku_last_updated: new Date().toISOString(),
                          sku_created: new Date().toISOString(),
                      },
        }, // key is "input" based on the mutation above
    };

    return async (dispatch) => {
        try {
            const data = await API.graphql({
                query: updateOrg,
                variables,
            });
            dispatch({
                type: ADD_SKU,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: ADD_SKU_ERR, error: err });
        }
    };
};

export const updateAnOrg = (postData) => {
    return async (dispatch) => {
        const post = {
            org_name: postData.org_name,
            org_id: postData.org_id,
        };

        try {
            const data = await API.graphql(
                graphqlOperation(updateOrg, {
                    input: {
                        id: postData.id,
                        org_id: post.org_id,
                        org_name: post.org_name,
                    },
                })
            );
            dispatch({
                type: UPDATE_ORG,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: UPDATE_ORG_ERR, error: err });
        }
    };
};

export const deleteAnOrg = ({ id }) => {
    return async (dispatch) => {
        try {
            const data = await API.graphql({
                query: deleteOrg,
                variables: {
                    input: { id },
                },
            });

            dispatch({
                type: DELETE_ORG,
                org: data.data.deleteOrg,
            });
        } catch (err) {
            dispatch({ type: DELETE_ORG_ERR, error: err });
        }
    };
};

export const addParam = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const { param_value, param_name } = postData;

        const variables = {
            input: {
                id: org.id,
                org_params:
                    org.org_params && org.org_params.length
                        ? [
                              ...org.org_params,
                              {
                                  param_id: uuidv4(),
                                  param_name,
                                  param_value,
                                  param_last_updated: new Date().toISOString(),
                                  param_created: new Date().toISOString(),
                              },
                          ]
                        : {
                              param_id: uuidv4(),
                              param_name,
                              param_value,
                              param_last_updated: new Date().toISOString(),
                              param_created: new Date().toISOString(),
                          },
            }, // key is "input" based on the mutation above
        };

        const data = await API.graphql({
            query: updateOrg,
            variables,
        });

        try {
            dispatch({
                type: ADD_PARAM,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: ADD_PARAM_ERR, error: err });
        }
    };
};

export const delParam = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const { param_id } = postData;
        let params = org.org_params;

        params.splice(
            params.findIndex((i) => {
                return i.param_id === param_id;
            })
        );

        const variables = {
            input: {
                id: org.id,
                org_params: params && params.length ? [...params] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: DELETE_PARAM,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: DELETE_PARAM_ERR, error: err });
        }
    };
};

export const updateParam = (param, postData, org) => {
    return async (dispatch) => {
        const param_id = param.param_id;
        let params = org.org_params;

        //find by original ID as the user may have changed the ID

        const index = params.findIndex(function (i) {
            return i.param_id === param_id;
        });

        params[index].param_name = postData.param_name;
        params[index].param_value = postData.param_value;
        params[index].param_last_updated = new Date().toISOString();

        const variables = {
            input: {
                id: org.id,
                org_params: params && params.length ? [...params] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: UPDATE_PARAM,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: UPDATE_PARAM_ERR, error: err });
        }
    };
};

export const addInsight = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const { insight_insight, insight_active } = postData;

        const variables = {
            input: {
                id: org.id,
                org_insights:
                    org.org_insights && org.org_insights.length
                        ? [
                              ...org.org_insights,
                              {
                                  insight_id: uuidv4(),
                                  insight_insight,
                                  insight_active,
                                  insight_last_updated: new Date().toISOString(),
                                  insight_created: new Date().toISOString(),
                              },
                          ]
                        : {
                              insight_id: uuidv4(),
                              insight_insight,
                              insight_active,
                              insight_last_updated: new Date().toISOString(),
                              insight_created: new Date().toISOString(),
                          },
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({
                query: updateOrg,
                variables,
            });
            dispatch({
                type: ADD_INSIGHT,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: ADD_INSIGHT_ERR, error: err });
        }
    };
};

export const delInsight = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const { insight_id } = postData;
        const insights = org.org_insights;

        insights.splice(
            insights.findIndex(function (i) {
                return i.id === insight_id;
            }),
            1
        );

        const variables = {
            input: {
                id: org.id,
                org_insights: insights && insights.length ? [...insights] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({
                query: updateOrg,
                variables,
            });
            dispatch({
                type: DELETE_INSIGHT,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: DELETE_INSIGHT_ERR, error: err });
        }
    };
};

export const updateInsight = (insight, postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const insight_id = insight.insight_id;
        let insights = org.org_insights;

        //find by original ID as the user may have changed the ID

        const index = insights.findIndex(function (i) {
            return i.insight_id === insight_id;
        });

        insights[index].insight_insight = postData.insight_insight;
        insights[index].insight_active = postData.insight_active;
        insights[index].insight_last_updated = new Date().toISOString();

        const variables = {
            input: {
                id: org.id,
                org_insights: insights && insights.length ? [...insights] : [],
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({
                query: updateOrg,
                variables,
            });
            dispatch({
                type: UPDATE_INSIGHT,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: UPDATE_INSIGHT_ERR, error: err });
        }
    };
};

export const addUpdate = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const variables = {
            input: {
                id: org.id,
                org_updates:
                    org.org_updates && org.org_updates.length
                        ? [
                              ...org.org_updates,
                              {
                                  ...postData,
                                  update_id: uuidv4(),
                                  update_last_updated: new Date().toISOString(),
                                  update_created: new Date().toISOString(),
                              },
                          ]
                        : {
                              ...postData,
                              update_id: uuidv4(),
                              update_last_updated: new Date().toISOString(),
                              update_created: new Date().toISOString(),
                          },
            }, // key is "input" based on the mutation above
        };

        try {
            const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: ADD_UPDATE,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: ADD_UPDATE_ERR, error: err });
        }
    };
};

export const delUpdate = (postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });

        const { update_id } = postData;
        const updates = org.org_updates;

        updates.splice(
            updates.findIndex(function (i) {
                return i.id === update_id;
            }),
            1
        );

        const variables = {
            input: {
                id: org.id,
                org_updates: updates && updates.length ? [...updates] : [],
            }, // key is "input" based on the mutation above
        };
        const data = await API.graphql({ query: updateOrg, variables });

        try {
            dispatch({
                type: DELETE_UPDATE,
                org: data.data.updateOrg,
            });
        } catch (err) {
            dispatch({ type: DELETE_UPDATE_ERR, error: err });
        }
    };
};

export const updateUpdate = (update, postData, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        const update_id = update.update_id;
        let updates = org.org_updates;

        //find by original ID as the user may have changed the ID

        const index = updates.findIndex(function (i) {
            return i.update_id === update_id;
        });

        updates[index].update_update = postData.update_update;
        updates[index].update_active = postData.update_active;
        updates[index].update_url = postData.update_url;
        updates[index].update_brand_id = postData.update_brand_id;
        updates[index].update_brand_name = postData.update_brand_name;
        updates[index].update_customer_id = postData.update_customer_id;
        updates[index].update_customer_name = postData.update_customer_name;
        updates[index].update_sku_description = postData.update_sku_description;
        updates[index].update_sku_id = postData.update_sku_id;
        updates[index].update_sku_number = postData.update_sku_number;

        updates[index].update_last_updated = new Date().toISOString();
        const variables = {
            input: {
                id: org.id,
                org_updates: updates && updates.length ? [...updates] : [],
            }, // key is "input" based on the mutation above
        };

        const data = await API.graphql({ query: updateOrg, variables });

        try {
            // const data = await API.graphql({ query: updateOrg, variables });
            dispatch({
                type: UPDATE_UPDATE,
                org: data.data.updateOrg,
                loading: false,
            });
        } catch (err) {
            dispatch({ type: UPDATE_UPDATE_ERR, error: err });
        }
    };
};

export const addCustomer = (customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });

        let skus = org.org_skus;
        let customers = sku.sku_customer;
        let newCustomer = customer;

        newCustomer.customer_last_updated = new Date().toISOString();
        newCustomer.customer_created = new Date().toISOString();
        newCustomer.id = uuidv4();

        const index = skus.findIndex(function (i) {
            return i.sku_id === sku.sku_id;
        });

        if (customers === null || customers === [] || customers.length === 0) {
            console.log("customers is null", customers);
            customers = [customer];
        } else {
            console.log("customers is not null", customers);
            customers = [...customers, customer];
        }

        skus[index].sku_customer = customers;

        const variables = {
            input: {
                id: org.id,
                org_skus: skus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));
        dispatch({
            type: ADD_CUSTOMER,
            org: data.data.updateOrg,
            sku: skus[index],
            loading: false,
        });
    };
};

export const editCustomer = (customer, postData, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let skus = org.org_skus;

        const newCustomer = { ...customer, ...postData };
        newCustomer.customer_last_updated = new Date().toISOString();

        const customer_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const newCustomers = sku.sku_customer;
        newCustomers[customer_index] = newCustomer;

        const sku_index = org.org_skus.findIndex(
            (s) => s.sku_id === sku.sku_id
        );

        skus[sku_index].sku_customer = newCustomers;

        const variables = {
            input: {
                id: org.id,
                org_skus: skus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        dispatch({
            type: EDIT_CUSTOMER,
            org: data.data.updateOrg,
            sku: skus[sku_index],
            loading: false,
        });
    };
};

export const delCustomer = (postData, sku, org) => {
    return async (dispatch) => {
        console.log("deleteing customers", postData);
        dispatch({ type: IS_LOADING });
        let newCustomers = sku.sku_customer;
        let newSkus = org.org_skus;

        const { customer_id } = postData;

        const customer_index = newCustomers.findIndex(
            (c) => c.customer_id === customer_id
        );

        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        newCustomers.splice(customer_index, 1);

        newSkus[sku_index].sku_customer = newCustomers;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        dispatch({
            type: DELETE_CUSTOMER,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            loading: false,
        });
    };
};

export const fetchCustomer = (skuIndex, customerId, org) => {
    const customer_index = org.org_skus[skuIndex].sku_customer.findIndex(
        (c) => c.customer_id === customerId
    );

    return (dispatch) =>
        dispatch({
            type: FETCH_CUSTOMER,
            org: org,
            sku: org.org_skus[skuIndex],
            customer: org.org_skus[skuIndex].sku_customer[customer_index],
        });
};

export const addCondition = (c, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;

        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const conditions = customer.customer_conditions
            ? customer.customer_conditions
            : [];

        const condition = {
            condition_condition: c.condition_condition,
            condition_high: c.condition_high,
            condition_low: c.condition_low,
            condition_value: c.condition_value,
            condition_message: c.condition_message,
            condition_last_updated: new Date().toISOString(),
            condition_created: new Date().toISOString(),
            condition_id: uuidv4(),
        };

        let newConditons = conditions;

        newConditons.push(condition);

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_conditions = newConditons;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        console.log(
            "🚀 ~ file: orgActions.js ~ line 796 ~ addCondition ~ newConditons",
            newConditons,
            newSkus
        );

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        console.log(
            "🚀 ~ file: orgActions.js ~ line 809 ~ addCondition ~ data",
            data
        );

        dispatch({
            type: ADD_CONDITION,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            customer: newCustomer,
        });
    };
};

export const editCondition = (c, condition, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;

        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const con_index = newSkus[sku_index].sku_customer[
            cus_index
        ].customer_conditions.findIndex(
            (cus) => cus.customer_id === c.customer_id
        );

        let conditions = customer.customer_conditions;

        const newCondition = {
            ...c,
            condition_id: condition.condition_id,
            condition_last_updated: new Date().toISOString(),
        };

        conditions[con_index] = newCondition;

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_conditions = conditions;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));
        dispatch({
            type: EDIT_CONDITION,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            customer: newCustomer,
        });
    };
};

export const delCondition = (c, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;
        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const con_index = newSkus[sku_index].sku_customer[
            cus_index
        ].customer_conditions.findIndex(
            (cus) => cus.customer_id === c.customer_id
        );

        let conditions = customer.customer_conditions;

        conditions.splice(con_index, 1);

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_conditions = conditions;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        if (data) {
            dispatch({
                type: DELETE_CONDITION,
                org: data.data.updateOrg,
                sku: newSkus[sku_index],
                customer: newCustomer,
            });
        }
    };
};

export const addPromotion = (p, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;

        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const promotions = customer.customer_promotions
            ? customer.customer_promotions
            : [];

        const promotion = {
            promotion_promotion: p.promotion_promotion,
            promotion_start_date: p.promotion_start_date,
            promotion_end_date: p.promotion_end_date,
            promotion_last_updated: new Date().toISOString(),
            promotion_created: new Date().toISOString(),
            promotion_id: uuidv4(),
        };

        let newPromotions = promotions;

        newPromotions.push(promotion);

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_promotions = newPromotions;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        dispatch({
            type: ADD_PROMOTION,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            customer: newCustomer,
        });
    };
};

export const editPromotion = (p, promotion, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;
        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const promo_index = newSkus[sku_index].sku_customer[
            cus_index
        ].customer_promotions.findIndex(
            (pro) => pro.promotion_id === promotion.promotion_id
        );

        let promotions = customer.customer_promotions;

        const newPromotion = {
            promotion_promotion: p.promotion_promotion,
            promotion_start_date: p.promotion_start_date,
            promotion_end_date: p.promotion_end_date,
            promotion_id: promotion.promotion_id,
            promotion_created: promotion.promotion_created,
            promotion_last_updated: new Date().toISOString(),
        };

        promotions[promo_index] = newPromotion;

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_promotions = promotions;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        dispatch({
            type: EDIT_PROMOTION,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            customer: newCustomer,
        });
    };
};

export const delPromotion = (p, customer, sku, org) => {
    return async (dispatch) => {
        dispatch({ type: IS_LOADING });
        let newSkus = org.org_skus;
        const sku_index = newSkus.findIndex((s) => s.sku_id === sku.sku_id);

        const cus_index = sku.sku_customer.findIndex(
            (c) => c.customer_id === customer.customer_id
        );

        const promo_index = newSkus[sku_index].sku_customer[
            cus_index
        ].customer_promotions.findIndex(
            (pro) => pro.promotion_id === p.promotion_id
        );

        let promotions = customer.customer_promotions;

        promotions.splice(promo_index, 1);

        let newCustomer = newSkus[sku_index].sku_customer[cus_index];

        newCustomer.customer_promotions = promotions;
        newSkus[sku_index].sku_customer[cus_index] = newCustomer;

        const variables = {
            input: {
                id: org.id,
                org_skus: newSkus,
            },
        };

        const data = await API.graphql(graphqlOperation(updateOrg, variables));

        dispatch({
            type: DELETE_PROMOTION,
            org: data.data.updateOrg,
            sku: newSkus[sku_index],
            customer: newCustomer,
        });
    };
};
