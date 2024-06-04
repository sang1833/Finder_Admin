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
import { ChatHeader, ChatMessage, ListConversation, LoadingIcon, MessageBoxInput } from './components';
import { ChatSection } from './components/ChatSection';
import { ChatClusMessage } from './components/ChatClusMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import io, { Socket } from 'socket.io-client';
const SOCKET_SERVER_CHAT_URL = 'http://localhost:5000/chat';

const ChatPage = () => {
  const _userId = Number(localStorage.getItem('userId'));
  const _PAGE_SIZE: number = 10;
  const [conversations, setConversations] = useState([]);
  const [conversationActiveId, setConversationActiveId] = useState<number>(0);
  const [detailConversationData, setDetailConversationData] = useState<ISection[]>([]);
  const [hasMoreSection, setHasMoreSection] = useState(true);
  const [userPartner, setUserPartner] = useState<IUserPartner | undefined>();
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  //* API QUERY
  // get list conversation
  const [getListConversation, { loading: isLoadingConversations }] = useLazyQuery(GET_USER_CONVERSATION);
  useEffect(() => {
    fetchListConversations();
  }, []);

  // get detail chat
  const [getDetailConversation, { loading: isLoadingSections }] = useLazyQuery(GET_DETAIL_CONVERSATION);

  //* API MUTATION
  // mutation update last read conversation
  const [updateLastReadConversation] = useMutation(UPDATE_LAST_READ_CONVERSATION);

  //* USE EFFECT
  // load list conversation
  useEffect(() => {
    reloadListConversations();
  }, []);

  // load detail conversation
  useEffect(() => {
    const loadFirstDetailConversation = async () => {
      if (conversationActiveId > 0) {
        const sections: ISection[] = await fetchDetailConversation(conversationActiveId, 1);
        if (!(sections.length > 0)) {
          setHasMoreSection(false);
        } else {
          const newSections = [...sections];
          setDetailConversationData(newSections);
          setHasMoreSection(true);
          setPageNumber(1);
        }
      }
    };
    loadFirstDetailConversation();
  }, [conversationActiveId]);

  // register chat socket
  useEffect(() => {
    const socket = io(SOCKET_SERVER_CHAT_URL, { transports: ['websocket'] });
    setChatSocket(socket);
    //* register
    socket.emit('register', _userId.toString());
    //* listen new message
    socket.on('newMessage', async (payload: INewMessageResDto) => {
      reloadListConversations();
      if (conversationActiveId == payload.conversationId) {
        //! Xử lý load message cho conversation active
      }
    });
    return () => {
      socket.close();
    };
  }, []);

  //* FUNCTION
  // fetch detail conversation data
  const fetchDetailConversation = async (conversationId: number, page: number) => {
    const { data } = await getDetailConversation({
      variables: {
        conversationId: conversationId,
        page: page,
        pageSize: _PAGE_SIZE,
      },
      fetchPolicy: 'network-only',
    });
    const sections: ISection[] = data?.getDetailConversation?.data?.listData;
    return sections;
  };

  // fetch list conversation of user
  const fetchListConversations = async () => {
    const { data } = await getListConversation({
      variables: {
        page: 1,
        pageSize: 10,
      },
      fetchPolicy: 'network-only',
    });
    const listConversations = data?.getUserConversations?.data?.listData ?? [];
    return listConversations;
  };

  // load more detail conversation data
  const loadMoreConversationData = async () => {
    const page = pageNumber + 1;
    const newSections: ISection[] = await fetchDetailConversation(conversationActiveId, page);
    if (!(newSections.length > 0)) {
      setHasMoreSection(false);
    } else {
      setDetailConversationData((prevSections) => {
        const data = [...prevSections, ...newSections];
        return data;
      });
      setPageNumber(page);
    }
  };

  // reload list conversation
  const reloadListConversations = async () => {
    const newList = await fetchListConversations();
    setConversations(newList);
  };

  // update last read conversation
  const updateLastReadNow = async (conversationId: number) => {
    await updateLastReadConversation({
      variables: {
        conversationId: conversationId,
        lastSeen: new Date(),
      },
    });
  };

  // show detail conversation active
  const handleShowDetailConversation = async ({
    conversationId,
    userId,
    avatar,
    displayName,
  }: IShowDetailConversationFnProps) => {
    if (conversationId == conversationActiveId) {
      return;
    }
    //* set user partner
    const userPartnerData: IUserPartner = {
      avatar: avatar,
      displayName: displayName,
      id: userId,
    };
    //* reload new conversation
    setUserPartner(userPartnerData);
    setConversationActiveId(conversationId);
    updateLastReadNow(conversationId);
    reloadListConversations();
  };

  return (
    <div className="w-full h-[calc(100%-60px)] text-black flex">
      {/* Main Panel */}
      <div className="w-3/4">
        {/* Chat Header */}
        <ChatHeader avatar={userPartner?.avatar} displayName={userPartner?.displayName} />
        {/* Main Chat */}
        <div id="chat-scrollable" className="h-[calc(100%-60px-120px)] p-5 overflow-y-scroll flex flex-col-reverse">
          <InfiniteScroll
            dataLength={detailConversationData.length}
            next={loadMoreConversationData}
            hasMore={hasMoreSection}
            scrollableTarget="chat-scrollable"
            inverse={true}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
            endMessage={<p className="text-center text-[#9e9e9e]">-- Không còn tin nhắn cũ hơn --</p>}
            loader={
              conversationActiveId ? (
                <LoadingIcon />
              ) : (
                <p className="text-center text-[#9e9e9e]">Bắt đầu cuộc trò chuyện của bạn!</p>
              )
            }
          >
            {Array.isArray(detailConversationData) &&
              detailConversationData.map((section: ISection, index) => {
                return (
                  <ChatSection startTime={section.createdDate} key={index}>
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
          </InfiniteScroll>
        </div>
        {/* Write Box */}
        <div className="h-[120px] bg-[#EFEFF4] border border-b-slate-300">
          <MessageBoxInput conversationId={conversationActiveId} />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/4 h-full bg-[#EFEFF4] border border-l-slate-300">
        {isLoadingConversations ? (
          <div className="">
            <LoadingIcon showLoadingText={true} />
          </div>
        ) : (
          <ListConversation conversations={conversations} onClickChildren={handleShowDetailConversation} />
        )}
      </div>
    </div>
  );
};
export default ChatPage;
