import { is } from "date-fns/locale";
import React, { useState } from "react";

// interface SnackbarProps {
//   isShow: boolean;
//   text: string;
//   setIsShow: (value: boolean) => void;
//   showSnackbar: (value: string) => void;
//   closeSnackbar: () => void;
// }

const snackbar = ({
  isShow,
  text,
  closeSnackbar,
  showSnackbar,
  setIsShow
}: SnackbarProps) => {
  //   const [isShow, setIsShow] = useState(false);

  //   function showSnackbar() {
  //     setIsShow(true);
  //     setTimeout(function () {
  //       setIsShow(false);
  //     }, 3000);
  //   }

  return (
    <div
      id="snackbar"
      className={
        `z-10 bg-gray-900 text-white p-4 rounded-md fixed top-4 right-4 flex justify-between items-center ` +
        `${isShow ? "opacity-100" : "opacity-0 bg-transparent"}` +
        `${isShow ? "block" : "hidden"}`
      }
    >
      {text}
      <button
        className={
          "text-white p-3 hover:cursor-pointer" +
          `${isShow ? "opacity-100" : "opacity-0"}` +
          `${isShow ? "block" : "hidden"}`
        }
        onClick={closeSnackbar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default snackbar;
