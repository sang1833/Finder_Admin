import { IChatMessageProps } from '@/type';
import classNames from 'classnames';
import React from 'react';

export const ChatMessage = ({ id, createdDate, isEdited, message, currentUserId, senderId }: IChatMessageProps) => {
  return (
    <div
      className={classNames('py-1 px-2 rounded-sm w-fit ', currentUserId == senderId ? 'bg-[#EFEFF4]' : 'bg-[#e9e9e9]')}
    >
      {message}
    </div>
  );
};
