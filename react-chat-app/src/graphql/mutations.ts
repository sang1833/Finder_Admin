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
