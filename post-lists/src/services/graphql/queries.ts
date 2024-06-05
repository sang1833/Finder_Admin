import { gql } from "@apollo/client";

export const GET_POST_WITH_FILTER_ADMIN = gql`
  query GetPostWithFilter($filters: AdminFilterPostInput!) {
    adminGetPostWithFilter(filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          approved
          createdDate
          description
          fileName
          filePath
          location
          locationDetail
          postType
          title
          updatedDate
        }
        totalCount
      }
      message
    }
  }
`;

export const GET_POST_WITH_FILTER = gql`
  query GetPostWithFilter($filters: FilterPostInput) {
    getPostWithFilter(filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          title
          postType
          location
          locationDetail
          description
          approved
          viewCount
          totalComments
          fileName
          filePath
          createdDate
          updatedDate
        }
        totalCount
      }
      message
    }
  }
`;

export const GET_ITEM_TYPE_WITH_FILTER = gql`
  query GetItemTypeWithFilter($filters: FilterItemTypeInput) {
    getItemTypeWithFilter(filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          name
          createdDate
          updatedDate
        }
        totalCount
      }
      message
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    getPostById(id: $id) {
      status
      statusCode
      data {
        id
        title
        location
        postType
        description
        contactPhone
        locationDetail
        authorId
        authorAvatar
        authorDisplayName
        images {
          fileName
          filePath
        }
        itemTypes {
          id
          name
        }
        createdDate
        updatedDate
        viewCount
        totalComments
        approved
      }
      message
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($postId: Int!, $filters: FilterPostCommentInput) {
    getComments(postId: $postId, filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          parentCommentId
          postId
          senderId
          displayName
          avatar
          isEdited
          content
          createdDate
          updatedDate
          subComments {
            id
            parentCommentId
            postId
            senderId
            displayName
            avatar
            isEdited
            content
            createdDate
            updatedDate
            subComments {
              id
              parentCommentId
              postId
              senderId
              displayName
              avatar
              isEdited
              content
              createdDate
              updatedDate
              subComments {
                id
                parentCommentId
                postId
                senderId
                displayName
                avatar
                isEdited
                content
                createdDate
                updatedDate
              }
            }
          }
        }
        totalCount
      }
      message
    }
  }
`;