import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <AiOutlineLoading3Quarters className="text-2xl text-[#9e9e9e] animate-spin" />
    </div>
  );
};
