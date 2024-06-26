import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($bodyReq: CreatePostInput!) {
    createPost(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const INCREASE_POST_VIEWS = gql`
  mutation IncreasePostViews($postId: Int!) {
    increasePostViews(postId: $postId) {
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

export const EDIT_COMMENT = gql`
  mutation EditComment($commentId: Int!, $bodyReq: EditCommentInput!) {
    editComment(commentId: $commentId, bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
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

export const CREATE_POST_REPORT = gql`
  mutation CreatePostReport($bodyReq: CreatePostReportInput!) {
    createPostReport(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const APPROVED_POST = gql`
  mutation Mutation($bodyReq: ApprovePostInput!) {
    adminApprovePost(bodyReq: $bodyReq) {
      message
      status
      statusCode
    }
  }
`;
