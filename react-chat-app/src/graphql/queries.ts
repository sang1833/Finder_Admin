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
        }
        totalCount
      }
    }
  }
`;
