import { IUserPartner } from '@/type';
import React from 'react';
import { IoFolderOpenOutline, IoSearch, IoSettingsOutline } from 'react-icons/io5';

export const ChatHeader = ({ avatar, displayName, id }: IUserPartner) => {
  return (
    <div className="h-[60px] bg-[#EFEFF4] border border-b-slate-300 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {avatar && (
          <div className="w-[40px] h-[40px] relative">
            <img className="rounded-full w-full h-full object-cover" src={avatar} />
            <span className="absolute rounded-full top-7 left-7 bg-[#08CE9E] p-2"></span>
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-bold text-[18px]">{displayName ?? 'Finder'}</h3>
          <p className="font-normal text-zinc-500">{displayName ? 'Đang hoạt động' : ''}</p>
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
