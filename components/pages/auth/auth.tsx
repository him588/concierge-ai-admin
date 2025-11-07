"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Signup from "./signup";
import Login from "./login";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="h-full  w-full relative  flex flex-col items-center  py-[2rem] px-[8rem]">
      {isLogin ? (
        <Login login={isLogin} setLogin={setIsLogin} />
      ) : (
        <Signup login={isLogin} setLogin={setIsLogin} />
      )}
    </div>
  );
}

export default Auth;
