import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_CONVERSATION, GET_DETAIL_CONVERSATION } from '../graphql/queries';
import { UPDATE_LAST_READ_CONVERSATION } from '@/graphql/mutations';
import {
  IClusMessage,
  IMessage,
  IShowDetailConversationFnProps,
  ISection,
  IUserPartner,
  INewMessageResDto,
} from '@/type';
import { ChatHeader, ChatMessage, ListConversation, MessageBoxInput } from './components';
import { ChatSection } from './components/ChatSection';
import { ChatClusMessage } from './components/ChatClusMessage';
import io, { Socket } from 'socket.io-client';
const SOCKET_SERVER_CHAT_URL = 'http://localhost:5000/chat';

const ChatPage = () => {
  const _userId = Number(localStorage.getItem('userId'));
  const [conversations, setConversations] = useState([]);
  const [conversationActiveId, setConversationActiveId] = useState<number>();
  const [detailConversation, setDetailConversation] = useState<ISection[]>([]);
  const [userPartner, setUserPartner] = useState<IUserPartner | undefined>();
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_CHAT_URL, { transports: ['websocket'] });
    setChatSocket(socket);
    //* register
    socket.emit('register', _userId.toString());
    //* listen new message:
    socket.on('newMessage', async (payload: INewMessageResDto) => {
      loadListConversation();
      if (conversationActiveId == payload.conversationId) {
        const { data } = await getDetailConversation({
          variables: {
            conversationId: conversationActiveId,
            page: 1,
            pageSize: 10,
          },
          fetchPolicy: 'network-only',
        });
        const detailConversation: ISection[] = data?.getDetailConversation?.data?.listData;
        //* reverse chat section
        let reverseConversation: ISection[] = Array.isArray(detailConversation)
          ? [...detailConversation].reverse()
          : detailConversation;
        setDetailConversation(reverseConversation);
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  //* Handle scroll load message
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('Loading ....');
    }
  };

  //* get list conversation
  const [getListConversation, { data: resultListConversations }] = useLazyQuery(GET_USER_CONVERSATION);
  useEffect(() => {
    loadListConversation();
  }, []);

  useEffect(() => {
    const listConversation = resultListConversations?.getUserConversations?.data?.listData;
    setConversations(listConversation);
  }, [resultListConversations]);

  //* get detail chat
  const [getDetailConversation, { data: resultDetailconversation }] = useLazyQuery(GET_DETAIL_CONVERSATION);
  useEffect(() => {
    const detailConversation: ISection[] = resultDetailconversation?.getDetailConversation?.data?.listData;
    //* reverse chat section
    let reverseConversation: ISection[] = Array.isArray(detailConversation)
      ? [...detailConversation].reverse()
      : detailConversation;
    setDetailConversation(reverseConversation);
  }, [resultDetailconversation]);

  //* mutation update last read conversation
  const [updateLastReadConversation, { data }] = useMutation(UPDATE_LAST_READ_CONVERSATION);

  //* handle show detail chat
  const handleShowDetailConversation = async ({
    conversationId,
    userId,
    avatar,
    displayName,
  }: IShowDetailConversationFnProps) => {
    //* set user partner
    const userPartnerData: IUserPartner = {
      avatar: avatar,
      displayName: displayName,
      id: userId,
    };
    setUserPartner(userPartnerData);
    setConversationActiveId(conversationId);
    //* update last read conversation
    await updateLastReadConversation({
      variables: {
        conversationId: conversationId,
        lastSeen: new Date(),
      },
    });
    loadListConversation();

    //* get detail conversation
    getDetailConversation({
      variables: {
        conversationId: conversationId,
        page: 1,
        pageSize: 10,
      },
    });
  };

  const loadListConversation = async () => {
    const { data } = await getListConversation({
      variables: {
        page: 1,
        pageSize: 10,
      },
      fetchPolicy: 'network-only',
    });
    const listConversation = data?.getUserConversations?.data?.listData;
    console.log('listConversation: ', listConversation);

    setConversations(listConversation);
  };

  return (
    <div className="w-full h-[calc(100%-60px)] text-black flex">
      {/* Main Panel */}
      <div className="w-3/4">
        {/* Chat Header */}
        <ChatHeader avatar={userPartner?.avatar} displayName={userPartner?.displayName} />
        {/* Main Chat */}
        <div className="h-[calc(100%-60px-120px)] p-5 overflow-y-scroll">
          {Array.isArray(detailConversation) &&
            detailConversation.map((section: ISection) => {
              return (
                <ChatSection startTime={section.createdDate} key={section.id}>
                  {Array.isArray(section?.clusMessages) &&
                    section.clusMessages.map((clusMsg: IClusMessage) => {
                      return (
                        <ChatClusMessage
                          avatar={userPartner?.avatar}
                          currentUserId={_userId}
                          senderId={clusMsg.senderId}
                          key={clusMsg.id}
                        >
                          {Array.isArray(clusMsg?.messages) &&
                            clusMsg.messages.map((message: IMessage) => (
                              <ChatMessage
                                key={message.id}
                                id={message.id}
                                message={message.message}
                                createdDate={message.createdDate}
                                isEdited={message.isEdited}
                                currentUserId={_userId}
                                senderId={clusMsg.senderId}
                              />
                            ))}
                        </ChatClusMessage>
                      );
                    })}
                </ChatSection>
              );
            })}
        </div>
        {/* Write Box */}
        <div className="h-[120px] bg-[#EFEFF4] border border-b-slate-300">
          <MessageBoxInput conversationId={conversationActiveId} />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/4 h-full bg-[#EFEFF4] border border-l-slate-300">
        <ListConversation conversations={conversations} onClickChildren={handleShowDetailConversation} />
      </div>
    </div>
  );
};
export default ChatPage;
