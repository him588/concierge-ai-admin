import { GoogleIcon } from "@/components/assets/icons";
import Input from "@/components/common/input";
import { ArrowLeft, ChevronLeft, MoveLeft } from "lucide-react";
import React, { useState, useRef } from "react";
import OTPInput from "./sub-components/otp-input";
import { handleChangeState, resolveError } from "@/components/helper/helper";

type Render = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function Signup({ login, setLogin }: Render) {
  const [render, setRender] = useState<"default" | "verify" | "success">(
    "verify"
  );

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [isResendSuccess, setIsResendSuccess] = useState(false);

  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));

  function handleSignup() {
    // Reset errors first
    setErrorMsg({ name: "", email: "", password: "", otp: "" });

    // Regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$#!%*?&]{8,}$/;

    if (!signupForm.name) {
      setErrorMsg((prev) => ({
        ...prev,
        name: "Name is required",
      }));
      return;
    } else if (signupForm.name.trim().length < 3) {
      setErrorMsg((prev) => ({
        ...prev,
        name: "Name must be at least 3 characters",
      }));
      return;
    }

    if (!signupForm.email) {
      setErrorMsg((prev) => ({
        ...prev,
        email: "Email should not be empty",
      }));
      return;
    } else if (!emailRegex.test(signupForm.email)) {
      setErrorMsg((prev) => ({
        ...prev,
        email: "Enter a valid email address",
      }));
      return;
    }

    if (!signupForm.password) {
      setErrorMsg((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      return;
    } else if (!passwordRegex.test(signupForm.password)) {
      setErrorMsg((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
      }));
      return;
    }

    setRender("verify");
    console.log("Signup successful:", signupForm);
  }

  async function handleVerifyUser() {
    const otp = values.join("").trim();
    setErrorMsg((prev) => ({ ...prev, otp: "" }));

    if (otp.length < 6) {
      setErrorMsg((prev) => ({
        ...prev,
        otp: `Opps !Incorrect otp`,
      }));
      return;
    }

    if (!/^\d+$/.test(otp)) {
      setErrorMsg((prev) => ({
        ...prev,
        otp: "OTP must contain only digits",
      }));
      return;
    }
  }

  function handleResend() {
    if (isResendSuccess) return;
    resolveError(setErrorMsg, "otp");
    console.log("hello");
    setIsResendSuccess(true);
    setTimeout(() => {
      setIsResendSuccess(false);
    }, 5000);
  }

  return (
    <>
      {render === "default" && (
        <>
          <div className=" h-full   max-w-[28rem]">
            <p className=" text-[30px] text-[#1c1d4e] font-semibold">
              Your virtual assistant awaits
            </p>

            {render === "default" && (
              <div className="mt-[2rem] flex flex-col gap-[1rem]">
                <Input
                  title="Name"
                  value={signupForm.name}
                  onChange={(e) => handleChangeState(e, setSignupForm, "name")}
                  onFocus={() => resolveError(setErrorMsg, "name")}
                  msg={errorMsg.name}
                />
                <Input
                  title="Your Email"
                  value={signupForm.email}
                  onChange={(e) => handleChangeState(e, setSignupForm, "email")}
                  onFocus={() => resolveError(setErrorMsg, "email")}
                  msg={errorMsg.email}
                />
                <Input
                  title="Password"
                  value={signupForm.password}
                  onChange={(e) =>
                    handleChangeState(e, setSignupForm, "password")
                  }
                  onFocus={() => resolveError(setErrorMsg, "password")}
                  msg={errorMsg.password}
                />
                <button
                  onClick={handleSignup}
                  className=" w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1.5rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold"
                >
                  Sign up
                </button>
                <div className="w-full flex items-center justify-center gap-[8px] mt-[1rem]">
                  <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
                  <p className=" text-[14px] text-[#a7a9a8] ">Instan Login</p>
                  <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
                </div>
                <button className="w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1rem] flex items-center justify-center gap-[.6rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.1)] text-[#898d96]  transition-all duration-250 text-[14px] ">
                  <GoogleIcon />{" "}
                  <p className=" mt-[.2rem]">Continue with Google</p>
                </button>
              </div>
            )}
          </div>
          <p className="absolute left-[50%] text-[#898d96] -translate-x-[50%] bottom-[.5rem] font-light text-[14px] ">
            Already have any account?{" "}
            <span
              onClick={() => setLogin(true)}
              className="cursor-pointer transition-all duration-250 font-semibold -mt-[.1rem] hover:text-[14.2px]  text-[#3B82F6] "
            >
              Sign In
            </span>
          </p>
        </>
      )}
      {render === "verify" && (
        <div className="h-full flex flex-col justify-center max-w-[24rem]">
          <div
            onClick={() => setRender("default")}
            className=" flex gap-[.2rem] items-center text-[#a7a9a8] origin-left transition-all duration-250 cursor-pointer hover:scale-[1.01]"
          >
            <ChevronLeft size={20} />
            Back
          </div>
          <p className=" text-[30px] mt-[2rem] text-[#1c1d4e] font-semibold">
            Your virtual assistant awaits
          </p>
          <p className="text-[#a7a9a8] mt-[.5rem] text-[14px] tracking-wider">
            Enter the code we just sent to verify your account.
          </p>
          <div className=" w-full flex  gap-[1rem] mt-[2rem] relative">
            <OTPInput
              onFocus={() => {
                resolveError(setErrorMsg, "otp");
              }}
              values={values}
              setValues={setValues}
            />
            <p className="absolute z-[999]  left-[0rem] text-[14px] font-semibold  -bottom-[1.4rem] text-[#1c1d4e]">
              {errorMsg.otp}
            </p>

            <p
              onClick={handleResend}
              className={`absolute z-[999]  right-[1.9rem] text-[14px] ${
                isResendSuccess ? "" : "hover:text-[15px] cursor-pointer"
              }  transition-all duration-250 font-semibold  -bottom-[1.4rem] text-[#1c1d4e]`}
            >
              {isResendSuccess ? "OTP sent successfully" : "Resend code"}
            </p>
          </div>
          <button
            onClick={handleVerifyUser}
            className=" w-[95%]   cursor-pointer hover:scale-[1.02] h-[45px] mt-[3rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold"
          >
            Verify Now
          </button>
        </div>
      )}
    </>
  );
}

export default Signup;
