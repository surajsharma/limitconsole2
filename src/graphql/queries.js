/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDefault = /* GraphQL */ `
  query GetDefault($id: ID!) {
    getDefault(id: $id) {
      createdAt
      default_condition
      default_created
      default_high
      default_id
      default_last_updated
      default_low
      default_message
      default_value
      id
      updatedAt
    }
  }
`;
export const getOrg = /* GraphQL */ `
  query GetOrg($id: ID!) {
    getOrg(id: $id) {
      createdAt
      id
      org_id
      org_insights {
        insight_active
        insight_created
        insight_id
        insight_insight
        insight_last_updated
      }
      org_last_updated
      org_name
      org_params {
        param_created
        param_id
        param_last_updated
        param_name
        param_value
      }
      org_skus {
        id
        sku_created
        sku_customer {
          customer_created
          customer_id
          customer_last_updated
          customer_name
          id
        }
        sku_description
        sku_id
        sku_last_updated
        sku_number
        sku_recommendations {
          recommendation_active
          recommendation_created
          recommendation_id
          recommendation_last_updated
          recommendation_recommendation
        }
      }
      org_updates {
        update_active
        update_brand_id
        update_brand_name
        update_created
        update_customer_id
        update_customer_name
        update_id
        update_last_updated
        update_sku_description
        update_sku_id
        update_sku_number
        update_update
        update_url
      }
      updatedAt
    }
  }
`;
export const listDefaults = /* GraphQL */ `
  query ListDefaults(
    $filter: ModelDefaultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDefaults(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        default_condition
        default_created
        default_high
        default_id
        default_last_updated
        default_low
        default_message
        default_value
        id
        updatedAt
      }
      nextToken
    }
  }
`;
export const listOrgs = /* GraphQL */ `
  query ListOrgs(
    $filter: ModelOrgFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrgs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        org_id
        org_insights {
          insight_active
          insight_created
          insight_id
          insight_insight
          insight_last_updated
        }
        org_last_updated
        org_name
        org_params {
          param_created
          param_id
          param_last_updated
          param_name
          param_value
        }
        org_skus {
          id
          sku_created
          sku_description
          sku_id
          sku_last_updated
          sku_number
        }
        org_updates {
          update_active
          update_brand_id
          update_brand_name
          update_created
          update_customer_id
          update_customer_name
          update_id
          update_last_updated
          update_sku_description
          update_sku_id
          update_sku_number
          update_update
          update_url
        }
        updatedAt
      }
      nextToken
    }
  }
`;
