import React from 'react';
import { IChatClusMessageProps } from '@/type';
import classNames from 'classnames';

export const ChatClusMessage = ({ avatar, senderId, currentUserId, children }: IChatClusMessageProps) => {
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
