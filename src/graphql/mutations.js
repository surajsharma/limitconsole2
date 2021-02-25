/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrg = /* GraphQL */ `
  mutation CreateOrg(
    $input: CreateOrgInput!
    $condition: ModelOrgConditionInput
  ) {
    createOrg(input: $input, condition: $condition) {
      id
      org_id
      org_name
      org_skus {
        sku_id
        sku_number
        sku_description
        sku_customer {
          customer_id
          customer_name
          customer_last_updated
          customer_created
        }
        sku_recommendations {
          recommendation_id
          recommendation_recommendation
          recommendation_active
          recommendation_last_updated
          recommendation_created
        }
        sku_last_updated
        sku_created
      }
      org_updates {
        update_id
        update_sku_number
        update_sku_id
        update_sku_description
        update_customer_id
        update_customer_name
        update_brand_id
        update_brand_name
        update_update
        update_url
        update_active
        update_last_updated
        update_created
      }
      org_insights {
        insight_id
        insight_insight
        insight_active
        insight_last_updated
        insight_created
      }
      org_params {
        param_id
        param_name
        param_value
        param_last_updated
        param_created
      }
      org_last_updated
      createdAt
      updatedAt
    }
  }
`;
export const updateOrg = /* GraphQL */ `
  mutation UpdateOrg(
    $input: UpdateOrgInput!
    $condition: ModelOrgConditionInput
  ) {
    updateOrg(input: $input, condition: $condition) {
      id
      org_id
      org_name
      org_skus {
        sku_id
        sku_number
        sku_description
        sku_customer {
          customer_id
          customer_name
          customer_last_updated
          customer_created
        }
        sku_recommendations {
          recommendation_id
          recommendation_recommendation
          recommendation_active
          recommendation_last_updated
          recommendation_created
        }
        sku_last_updated
        sku_created
      }
      org_updates {
        update_id
        update_sku_number
        update_sku_id
        update_sku_description
        update_customer_id
        update_customer_name
        update_brand_id
        update_brand_name
        update_update
        update_url
        update_active
        update_last_updated
        update_created
      }
      org_insights {
        insight_id
        insight_insight
        insight_active
        insight_last_updated
        insight_created
      }
      org_params {
        param_id
        param_name
        param_value
        param_last_updated
        param_created
      }
      org_last_updated
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrg = /* GraphQL */ `
  mutation DeleteOrg(
    $input: DeleteOrgInput!
    $condition: ModelOrgConditionInput
  ) {
    deleteOrg(input: $input, condition: $condition) {
      id
      org_id
      org_name
      org_skus {
        sku_id
        sku_number
        sku_description
        sku_customer {
          customer_id
          customer_name
          customer_last_updated
          customer_created
        }
        sku_recommendations {
          recommendation_id
          recommendation_recommendation
          recommendation_active
          recommendation_last_updated
          recommendation_created
        }
        sku_last_updated
        sku_created
      }
      org_updates {
        update_id
        update_sku_number
        update_sku_id
        update_sku_description
        update_customer_id
        update_customer_name
        update_brand_id
        update_brand_name
        update_update
        update_url
        update_active
        update_last_updated
        update_created
      }
      org_insights {
        insight_id
        insight_insight
        insight_active
        insight_last_updated
        insight_created
      }
      org_params {
        param_id
        param_name
        param_value
        param_last_updated
        param_created
      }
      org_last_updated
      createdAt
      updatedAt
    }
  }
`;
