"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OTPInput from "./components/otp-input";
import Input from "@/components/common/input";

function ForgotPassword() {
  const [render, setRender] = useState<"default" | "otp" | "success">(
    "default"
  );
  const router = useRouter();
  return (
    <div className="h-full  w-full relative  flex flex-col items-center  py-[2rem] px-[8rem]">
      {render === "default" && (
        <div className=" h-full  max-w-[28rem] flex flex-col justify-center">
          <div
            onClick={() => router.back()}
            className=" flex gap-[.2rem] items-center text-[#a7a9a8] origin-left transition-all duration-250 cursor-pointer hover:text-[#a7a9a8]/95"
          >
            <ChevronLeft size={20} />
            Back
          </div>
          <p className=" text-[30px] mt-[2rem] text-[#1c1d4e] font-semibold">
            Your Concierge is waiting.
          </p>
          <p className="text-[#a7a9a8] mt-[.5rem] text-[14px] tracking-wider">
            Enter your email to reset your Concierge password.
          </p>
          <div className=" w-full flex  gap-[1rem] mt-[2rem] relative">
            <Input placeholder="Enter your email" />
            {/* <OTPInput />
            <p className=" absolute right-[1.9rem] text-[14px] hover:text-[15px] transition-all duration-250 font-semibold cursor-pointer -bottom-[1.4rem] text-[#1c1d4e]">
              Resend code
            </p> */}
          </div>
          <button
            onClick={() => setRender("otp")}
            className=" cursor-pointer hover:scale-[1.02] h-[45px] mt-[1rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold"
          >
            Continue
          </button>
        </div>
      )}
      {render === "otp" && (
        <div className="h-full flex flex-col justify-center max-w-[24rem]">
          <div
            onClick={() => setRender("default")}
            className=" flex gap-[.2rem] items-center text-[#a7a9a8] origin-left transition-all duration-250 cursor-pointer hover:scale-[1.01]"
          >
            <ChevronLeft size={20} />
            Back
          </div>
          <p className=" text-[30px] mt-[2rem] text-[#1c1d4e] font-semibold">
            Verify its you ...
          </p>
          <p className="text-[#a7a9a8] mt-[.5rem] text-[14px] tracking-wider">
            Enter the 6-digit code to verify and reset your password.
          </p>
          <div className=" w-full flex  gap-[1rem] mt-[2rem] relative">
            <OTPInput />
            <p className=" absolute right-[1.8rem] text-[14px] hover:text-[15px] transition-all duration-250 font-semibold cursor-pointer -bottom-[1.4rem] text-[#1c1d4e]">
              Resend code
            </p>
          </div>
          <button className=" w-[95%]   cursor-pointer hover:scale-[1.02] h-[45px] mt-[3rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold">
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
