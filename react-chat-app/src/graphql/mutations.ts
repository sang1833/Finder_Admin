import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation sendMessage($conversationId: Int!, $message: String!) {
    sendMessage(bodyReq: { conversationId: $conversationId, message: $message }) {
      status
      statusCode
      message
    }
  }
`;

export const UPDATE_LAST_READ_CONVERSATION = gql`
  mutation updateLastReadConversation($conversationId: Int!, $lastSeen: Date!) {
    updateLastReadConversation(bodyReq: { conversationId: $conversationId, lastSeen: $lastSeen }) {
      status
      statusCode
      message
    }
  }
`;
