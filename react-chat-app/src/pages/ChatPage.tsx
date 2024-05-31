import React, { Children, useEffect, useState } from 'react';
import { IoSettingsOutline, IoSearch, IoFolderOpenOutline } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { RiVideoOnLine } from 'react-icons/ri';
import classNames from 'classnames';

const ChatPage = () => {
  const [data, setData] = useState([]);

  return (
    <div className="w-full h-[calc(100%-60px)] text-black flex">
      {/* Main Panel */}
      <div className="w-3/4">
        {/* Chat Header */}
        <ChatHeader />
        {/* Main Chat */}
        <div className="h-[calc(100%-60px-120px)] p-5 overflow-y-scroll">
          {[1, 2, 3, 4].map((item) => (
            <ChatSection>
              {[1, 2, 3, 4, 5].map((item2, index) => (
                <ChatClusMessage index={index}>
                  {[1, 2, 3].map((item3) => (
                    <ChatMessage index={index} />
                  ))}
                </ChatClusMessage>
              ))}
            </ChatSection>
          ))}
        </div>
        {/* Write Box */}
        <div className="h-[120px] bg-[#EFEFF4] border border-b-slate-300">
          <MessageBoxInput />
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/4 h-full bg-[#EFEFF4] border border-l-slate-300">
        <ListConversation />
      </div>
    </div>
  );
};
export default ChatPage;

const ChatHeader = () => {
  return (
    <div className="h-[60px] bg-[#EFEFF4] border border-b-slate-300 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-[40px] h-[40px] relative">
          <img
            className="rounded-full w-full h-full object-cover"
            src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1716223897/finder_storage/njwa9sri9qcrmuedooor.jpg"
          />
          <span className="absolute rounded-full top-7 left-7 bg-[#08CE9E] p-2"></span>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-[18px]">Trần Quốc Thảo</h3>
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

const MessageBoxInput = () => {
  return (
    <div className="flex flex-col px-4">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <BsEmojiSmile className="text-[20px] text-[#2A477F]" />
          <MdAttachFile className="text-[20px] text-[#2A477F]" />
          <RiVideoOnLine className="text-[20px] text-[#2A477F]" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <input className="size-4" type="checkbox" name="press-enter" id="press-enter" />
            <span className="text-[14px]">Nhấn Enter để gửi</span>
          </div>
          <button className="px-6 py-1 rounded-sm bg-[#2A477F] text-white">Gửi</button>
        </div>
      </div>
      {/* Chat Box */}
      <textarea
        className="flex-1 py-1 px-2 outline-none border border-slate-300"
        placeholder="Nhập tin nhắn ở đây"
        name="chat-box"
        id="chat-box"
      />
    </div>
  );
};

const ListConversation = () => {
  return (
    <div className="h-full px-4 py-4">
      {/* Filter conversation */}
      <div className="w-full h-[30px] mb-[14px] rounded-sm border border-slate-300 flex items-center px-2">
        <p className="text-[#414141cc]">Tất cả hội thoại</p>
      </div>
      {/* List */}
      <ul className="h-[calc(100%-30px)] py-4 flex flex-col overflow-y-scroll">
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <UserConversation />
        <p className="text-center p-3">Xem thêm</p>
      </ul>
    </div>
  );
};

const UserConversation = () => {
  return (
    <li className="flex justify-between items-center p-2 transition-colors hover:bg-white cursor-pointer active:opacity-80">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-[34px] h-[34px] relative">
          <img
            className="rounded-full w-full h-full object-cover"
            src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1716223897/finder_storage/njwa9sri9qcrmuedooor.jpg"
          />
          <span className="absolute rounded-full top-6 left-6 bg-[#08CE9E] w-[12px] h-[12px]"></span>
        </div>
        {/* Infor */}
        <div className="flex flex-col">
          <h3 className="font-bold text-[14px]">Trần Quốc Thảo</h3>
          <p className="font-normal text-[14px] text-zinc-500">I’m expected that the ...</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-1">
        <p className="text-[12px] font-semibold">10:30 PM</p>
        <MessageBadge />
      </div>
    </li>
  );
};

const MessageBadge = () => {
  return (
    <div className="w-[16px] h-[16px] rounded-full flex justify-center items-center bg-blue-700">
      <span className="text-white font-bold text-[11px]">2</span>
    </div>
  );
};

const ChatSection = ({ startTime, children }: { startTime?: Date; children: React.ReactNode }) => {
  return (
    <div className="">
      <p className="text-center text-[14px] text-[#363636]">28/05/2024</p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

const ChatClusMessage = ({
  index,
  avatar,
  children,
}: {
  index: number;
  avatar?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={classNames('flex items-end gap-2', index % 2 == 0 ? 'flex-row-reverse' : '')}>
      {/* Avatar */}
      <img
        className={classNames('w-[30px] h-[30px] rounded-full object-cover', index % 2 == 0 ? 'hidden' : '')}
        src="https://res.cloudinary.com/dwskvqnkc/image/upload/v1716223897/finder_storage/njwa9sri9qcrmuedooor.jpg"
      />
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
};

const ChatMessage = ({ index }: { index: number }) => {
  return (
    <div className={classNames('py-1 px-2 rounded-sm', index % 2 == 0 ? 'bg-[#EFEFF4]' : 'bg-[#e9e9e9]')}>
      Xin chào Admin
    </div>
  );
};
