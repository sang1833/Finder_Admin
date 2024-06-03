import React, { useEffect, useState } from 'react';
import { IoSettingsOutline, IoSearch, IoFolderOpenOutline } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { RiVideoOnLine } from 'react-icons/ri';
import classNames from 'classnames';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_CONVERSATION, GET_DETAIL_CONVERSATION } from '../graphql/queries';
import { SEND_MESSAGE, UPDATE_LAST_READ_CONVERSATION } from '@/graphql/mutations';
import { formatTimeToString } from '../utils';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {
  IChatClusMessageProps,
  IClusMessage,
  IConversationSummary,
  IConversations,
  IMessage,
  IChatMessageProps,
  IShowDetailConversationFnProps,
  ISection,
  IUserPartner,
  IChatSectionProps,
  IMessageBadgeProps,
} from '@/type';

const ChatPage = () => {
  const _userId = Number(localStorage.getItem('userId'));
  const [conversations, setConversations] = useState([]);
  const [conversationActiveId, setConversationActiveId] = useState<number>();
  const [detailConversation, setDetailConversation] = useState<ISection[]>([]);
  const [userPartner, setUserPartner] = useState<IUserPartner | undefined>();

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

  const loadListConversation = () => {
    getListConversation({
      variables: {
        page: 1,
        pageSize: 10,
      },
    });
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

const ChatHeader = ({ avatar, displayName, id }: IUserPartner) => {
  return (
    <div className="h-[60px] bg-[#EFEFF4] border border-b-slate-300 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-[40px] h-[40px] relative">
          <img className="rounded-full w-full h-full object-cover" src={avatar} />
          <span className="absolute rounded-full top-7 left-7 bg-[#08CE9E] p-2"></span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-[18px]">{displayName}</h3>
          <p className="font-normal text-zinc-500">Đang hoạt động</p>
        </div>
      </div>

      {/* Chat Setting */}
      <div className="flex items-center gap-4">
        <IoSearch className="text-[25px] text-[#2A477F]" />
        <IoFolderOpenOutline className="text-[25px] text-[#2A477F]" />
        <IoSettingsOutline className="text-[25px] text-[#2A477F]" />
      </div>
    </div>
  );
};

const MessageBoxInput = ({ conversationId }: { conversationId?: number }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  //* handle pick emoji
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  //* handle send message
  const handleSendMessage = (message: string) => {
    if (conversationId && message.trim() != '') {
      sendMessage({
        variables: {
          conversationId: conversationId,
          message: message,
        },
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col px-4">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 relative">
          {showEmojiPicker && (
            <div className="absolute bottom-10">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
          <BsEmojiSmile
            className="text-[20px] text-[#2A477F] cursor-pointer hover:opacity-95 active:opacity-80"
            onClick={() => setShowEmojiPicker((val) => !val)}
          />
          <MdAttachFile className="text-[20px] text-[#2A477F] cursor-pointer hover:opacity-95 active:opacity-80" />
          <RiVideoOnLine className="text-[20px] text-[#2A477F] cursor-pointer hover:opacity-95 active:opacity-80" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <input className="size-4" type="checkbox" name="press-enter" id="press-enter" />
            <span className="text-[14px]">Nhấn Enter để gửi</span>
          </div>
          <button
            className="px-6 py-1 rounded-sm bg-[#2A477F] text-white hover:opacity-95 active:opacity-80"
            onClick={() => handleSendMessage(message)}
          >
            Gửi
          </button>
        </div>
      </div>
      {/* Chat Box */}
      <textarea
        className="flex-1 py-1 px-2 outline-none border border-slate-300"
        placeholder="Nhập tin nhắn ở đây"
        name="chat-box"
        id="chat-box"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
    </div>
  );
};

const ListConversation = ({ conversations, onClickChildren }: IConversations) => {
  return (
    <div className="h-full px-4 py-4">
      {/* Filter conversation */}
      <div className="w-full h-[30px] mb-[14px] rounded-sm border border-slate-300 flex items-center px-2">
        <p className="text-[#414141cc]">Tất cả hội thoại</p>
      </div>
      {/* List */}
      <ul className="h-[calc(100%-30px)] py-4 flex flex-col overflow-y-scroll">
        {Array.isArray(conversations) &&
          conversations.map((c) => (
            <UserConversation
              key={c.conversationId}
              avatar={c.avatar}
              conversationId={c.conversationId}
              lastMessage={c.lastMessage}
              lastTime={c.lastTime}
              userName={c.userName}
              userId={c.userId}
              unreadCount={c.unreadCount}
              onClick={onClickChildren}
            />
          ))}
        <p className="text-center p-3">Xem thêm</p>
      </ul>
    </div>
  );
};

const UserConversation = ({
  conversationId,
  userId,
  userName,
  avatar,
  lastMessage,
  lastTime,
  unreadCount,
  onClick,
}: IConversationSummary) => {
  return (
    <li
      className="flex justify-between items-center p-2 transition-colors hover:bg-white cursor-pointer active:opacity-80"
      onClick={() => onClick({ avatar, conversationId, userId, displayName: userName })}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-[34px] h-[34px] relative flex-shrink-0">
          <img className="rounded-full w-full h-full object-cover" src={avatar} />
          <span className="absolute rounded-full top-6 left-6 bg-[#08CE9E] w-[12px] h-[12px]"></span>
        </div>
        {/* Infor */}
        <div className="flex flex-col max-w-[150px]">
          <h3 className="font-bold text-[14px]">{userName}</h3>
          <p
            className={classNames(
              'text-[14px] truncate whitespace-nowrap overflow-hidden text-ellipsis',
              unreadCount > 0 ? 'font-semibold text-black' : 'font-normal text-zinc-500',
            )}
          >
            {lastMessage}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-1">
        <p className={classNames('text-[12px]', unreadCount > 0 ? 'font-semibold' : 'font-normal')}>
          {formatTimeToString(lastTime)}
        </p>
        <MessageBadge unreadCount={unreadCount} />
      </div>
    </li>
  );
};

const MessageBadge = ({ unreadCount }: IMessageBadgeProps) => {
  return unreadCount > 0 ? (
    <div className="w-[16px] h-[16px] rounded-full flex justify-center items-center bg-blue-700">
      <span className="text-white font-bold text-[11px]">{unreadCount}</span>
    </div>
  ) : (
    <div className="w-[16px] h-[16px]"></div>
  );
};

//* Chat Section Component
const ChatSection = ({ startTime, children }: IChatSectionProps) => {
  return (
    <div className="my-3">
      <p className="text-center text-[14px] text-[#363636] my-2">{formatTimeToString(startTime)}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

//* Chat Clus_Message Component
const ChatClusMessage = ({ avatar, senderId, currentUserId, children }: IChatClusMessageProps) => {
  return (
    <div className={classNames('flex gap-2 mb-4', senderId == currentUserId ? 'flex-row-reverse' : '')}>
      {/* Avatar */}
      <img
        className={classNames(
          'w-[30px] h-[30px] rounded-full object-cover flex-shrink-0',
          senderId == currentUserId ? 'hidden' : '',
        )}
        src={avatar}
      />
      <div className={classNames('flex flex-col gap-1', senderId == currentUserId ? 'items-end' : 'items-start')}>
        {children}
      </div>
    </div>
  );
};

//* Chat Message Component
const ChatMessage = ({ id, createdDate, isEdited, message, currentUserId, senderId }: IChatMessageProps) => {
  return (
    <div
      className={classNames('py-1 px-2 rounded-sm w-fit ', currentUserId == senderId ? 'bg-[#EFEFF4]' : 'bg-[#e9e9e9]')}
    >
      {message}
    </div>
  );
};
