import { gql } from '@apollo/client';

export const GET_USER_CONVERSATION = gql`
  query getUserConversations($page: Int, $pageSize: Int) {
    getUserConversations(filters: { page: $page, pageSize: $pageSize }) {
      status
      statusCode
      data {
        listData {
          conversationId
          userId
          userName
          avatar
          lastMessage
          lastTime
          unreadCount
        }
        totalCount
      }
    }
  }
`;

export const GET_DETAIL_CONVERSATION = gql`
  query getDetailConversation($conversationId: Int!, $page: Int, $pageSize: Int) {
    getDetailConversation(conversationId: $conversationId, filters: { page: $page, pageSize: $pageSize }) {
      status
      statusCode
      data {
        listData {
          id
          createdDate
          clusMessages {
            id
            senderId
            messages {
              id
              isEdited
              createdDate
              message
            }
          }
        }
        totalCount
      }
      message
    }
  }
`;
