import React from "react";
import { Outlet } from "react-router-dom";

const RootPage = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default RootPage;
