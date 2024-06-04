import { SEND_MESSAGE } from '@/graphql/mutations';
import { IMessageBoxInputProps } from '@/type';
import { useMutation } from '@apollo/client';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { KeyboardEvent, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { RiVideoOnLine } from 'react-icons/ri';

export const MessageBoxInput = ({ conversationId, onReloadConversation }: IMessageBoxInputProps) => {
  const [message, setMessage] = useState('');
  const [enterToSend, setEnterToSend] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  //* API
  // send message
  const postSendMessage = async (conversationId: number, message: string) => {
    await sendMessage({
      variables: {
        conversationId: conversationId,
        message: message,
      },
    });
  };

  //* FUNCTION
  // handle pick emoji
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  // handle send message
  const handleSendMessage = async (message: string) => {
    if (conversationId && message.trim() != '') {
      setMessage('');
      await postSendMessage(conversationId, message);
      onReloadConversation();
    }
  };

  // handle press Enter
  const handlePressEnterSendMessage = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey && enterToSend) {
      await handleSendMessage(message);
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
            <input
              className="size-4"
              type="checkbox"
              name="press-enter"
              id="press-enter"
              onChange={(e) => setEnterToSend(e.target.checked)}
            />
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
        onKeyDown={(e) => handlePressEnterSendMessage(e)}
      />
    </div>
  );
};
