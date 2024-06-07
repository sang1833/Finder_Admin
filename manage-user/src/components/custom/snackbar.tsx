import { is } from "date-fns/locale";
import React, { useState } from "react";

const snackbar = (props: SnackbarProps) => {
  //   const [isShow, setIsShow] = useState(false);

  //   function showSnackbar() {
  //     setIsShow(true);
  //     setTimeout(function () {
  //       setIsShow(false);
  //     }, 3000);
  //   }

  function closeSnackbar() {
    props.setIsShow(false);
  }

  return (
    <div
      id="snackbar"
      className={
        `z-10 bg-gray-900 text-white p-4 rounded-md fixed bottom-4 right-4 flex justify-between items-center` +
        `${props.isShow ? "opacity-100" : "opacity-0"}` +
        `${props.isShow ? "block" : "hidden"}`
      }
    >
      {props.text}
      <button
        className={
          "text-white" +
          `${props.isShow ? "opacity-100" : "opacity-0"}` +
          `${props.isShow ? "block" : "hidden"}`
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
