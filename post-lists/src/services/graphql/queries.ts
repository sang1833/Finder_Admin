import { gql } from "@apollo/client";

export const GET_POST_WITH_FILTER = gql`
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
      }
      message
    }
  }
`;
