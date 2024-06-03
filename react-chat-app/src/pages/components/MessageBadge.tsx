import { IMessageBadgeProps } from '@/type';
import React from 'react';

export const MessageBadge = ({ unreadCount }: IMessageBadgeProps) => {
  return unreadCount > 0 ? (
    <div className="w-[16px] h-[16px] rounded-full flex justify-center items-center bg-blue-700">
      <span className="text-white font-bold text-[11px]">{unreadCount}</span>
    </div>
  ) : (
    <div className="w-[16px] h-[16px]"></div>
  );
};
