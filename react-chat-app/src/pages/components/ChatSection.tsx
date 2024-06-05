import { IChatSectionProps } from '@/type';
import { formatTimeToString } from '@/utils';
import React from 'react';

export const ChatSection = ({ startTime, children }: IChatSectionProps) => {
  return (
    <div className="my-3">
      <p className="text-center text-[14px] text-[#363636] my-2">{formatTimeToString(startTime)}</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
