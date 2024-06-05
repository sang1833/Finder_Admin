import { IConversationSummary } from '@/type';
import React from 'react';
import { MessageBadge } from './MessageBadge';
import { formatTimeToString } from '@/utils';
import classNames from 'classnames';

export const UserConversation = ({
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
