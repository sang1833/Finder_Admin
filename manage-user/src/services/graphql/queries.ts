import { gql } from "@apollo/client";

export const GET_LIST_USER = gql`
  query GetListUser($filters: FilterUserInput) {
    getListUser(filters: $filters) {
      status
      data {
        totalCount
        listData {
          id
          email
          displayName
          avatar
          activate
          lastLogin
        }
      }
      statusCode
      message
    }
  }
`;

export const GET_LIST_ITEMTYPE = gql`
  query GetItemTypeWithFilter($filters: FilterItemTypeInput) {
    getItemTypeWithFilter(filters: $filters) {
      status
      statusCode
      message
      data {
        listData {
          id
          name
          updatedDate
        }
        totalCount
      }
    }
  }
`;
