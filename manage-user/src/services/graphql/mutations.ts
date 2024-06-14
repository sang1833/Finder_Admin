import { gql } from "@apollo/client";

export const ACTIVE_USER_ACCOUNT = gql`
  mutation Mutation($bodyReq: ActivateUserInput!) {
    activateUserAccount(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const CREATE_ITEM_TYPE = gql`
  mutation Mutation($bodyReq: CreateItemTypeInput!) {
    createItemType(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const UPDATE_ITEM_TYPE = gql`
  mutation Mutation($updateItemTypeId: Int!, $bodyReq: UpdateItemTypeInput!) {
    updateItemType(id: $updateItemTypeId, bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const DELETE_ITEM_TYPE = gql`
  mutation Mutation($deleteItemTypeId: Int!) {
    deleteItemType(id: $deleteItemTypeId) {
      status
      statusCode
      message
    }
  }
`;
