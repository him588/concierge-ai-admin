"use client";
import { GoogleIcon } from "@/components/assets/icons";
import Input from "@/components/common/input";
import { useRouter } from "next/navigation";
import React from "react";
type Render = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ login, setLogin }: Render) {
  const router = useRouter();
  return (
    <>
      <div className=" h-full  max-w-[28rem]">
        <p className=" text-[30px] text-[#1c1d4e] font-semibold">
          Welcome Back to Concierge!
        </p>
        <p className="text-[#a7a9a8] mt-[.5rem] text-[14px] tracking-wider">
          Sign in your account
        </p>

        <div className="mt-[2rem] flex flex-col gap-[1.5rem]">
          <Input title="Your Email" />
          <Input title="Password" />
          <div className=" w-full flex justify-end relative -mt-[.5rem]">
            <p
              onClick={() => router.push("/forgot-password")}
              className=" text-[12px] absolute  text-[#a7a9a8] transition-all duration-250 hover:text-[12.5px] cursor-pointer "
            >
              Forgot Password?
            </p>
          </div>
          <button className=" w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1.5rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold">
            Login
          </button>
          <div className="w-full flex items-center justify-center gap-[8px] mt-[1rem]">
            <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
            <p className=" text-[14px] text-[#a7a9a8] ">Instan Login</p>
            <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
          </div>
          <button className="w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1rem] flex items-center justify-center gap-[.6rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.1)] text-[#898d96]  transition-all duration-250 text-[14px] ">
            <GoogleIcon /> <p className=" mt-[.2rem]">Continue with Google</p>
          </button>
        </div>
      </div>
      <p className="absolute left-[50%] text-[#898d96] -translate-x-[50%] bottom-[.5rem] font-light text-[14px] ">
        Don&apos;t have any account?{" "}
        <span
          onClick={() => setLogin(false)}
          className="cursor-pointer transition-all duration-250 font-semibold -mt-[.1rem] hover:text-[14.2px]  text-[#3B82F6] "
        >
          Register
        </span>
      </p>
    </>
  );
}

export default Login;
