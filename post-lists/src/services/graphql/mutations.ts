import { gql } from "@apollo/client";

export const UPDATE_MY_ACCOUNT = gql`
  mutation UpdateMyAccount($bodyReq: UpdateMyAccountInput!) {
    updateMyAccount(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($bodyReq: AddCommentInput!) {
    addComment(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation ReplyComment($bodyReq: ReplyCommentInput!) {
    replyComment(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;
