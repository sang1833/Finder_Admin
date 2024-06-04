import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export const LoadingIcon = ({ showLoadingText }: { showLoadingText?: boolean }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <AiOutlineLoading3Quarters className="text-2xl text-[#9e9e9e] animate-spin" />
      {showLoadingText && <p className="text-[#9e9e9e] text-center mt-4">Đang tải</p>}
    </div>
  );
};
