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
