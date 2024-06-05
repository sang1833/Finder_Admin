import React from 'react';
import { IConversations } from '@/type';
import { UserConversation } from './UserConversation';

export const ListConversation = ({ conversations, onClickChildren }: IConversations) => {
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
