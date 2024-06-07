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
