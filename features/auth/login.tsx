"use client";
import { GoogleIcon } from "@/components/assets/icons";
import Input from "@/components/common/input";
import { handleChangeState, resolveError } from "@/components/helper/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import AppConfig from "@/components/lib/app-config";
import { googleAuthentication, userLogin } from "./api";
import { JWTProvider } from "@/components/lib/jwt-provider";
import CookieProvider from "@/components/lib/cookie";
import { REFRESH_TOKEN } from "@/components/types/const";

type Render = {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function Login({ login, setLogin }: Render) {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function googleResponse(res: any) {
    try {
      console.log(res);
      if (res.access_token) {
        const response = await googleAuthentication(res.access_token);
        if (response.status === 201 || response.status === 200) {
          router.push("/overview");
        }
      }
    } catch (error) {
      console.log("Error while google authentication", error);
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
  });

  async function handleLogin() {
    console.log(AppConfig.env.ServiceBaseUrl);
    if (!loginForm.email) {
      setErrorMsg((prev) => {
        return { ...prev, email: "Email should not be empty" };
      });
      return;
    }
    if (!loginForm.password) {
      setErrorMsg((prev) => {
        return { ...prev, password: "Password is required" };
      });
      return;
    }
    try {
      const response = await userLogin(loginForm.email, loginForm.password);
      if (response.status === 200) {
        console.log(response.data);
        const accessToken = response.data.accessToken;
        JWTProvider.decodeAndSetToken(accessToken);
        CookieProvider.setCookie(REFRESH_TOKEN, response.data.refreshToken, {
          path: "/",
          expires: new Date(Date.now() + 30 * 60 * 1000),
        });
        console.log(JWTProvider.metadata);

        router.push("/overview");
      }
    } catch (error) {
      console.log("Error while user login", error);
    }
  }

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
          <Input
            title="Your Email"
            value={loginForm.email}
            onChange={(e) => handleChangeState(e, setLoginForm, "email")}
            onFocus={() => resolveError(setErrorMsg, "email")}
            msg={errorMsg.email}
          />
          <Input
            title="Password"
            value={loginForm.password}
            onChange={(e) => handleChangeState(e, setLoginForm, "password")}
            onFocus={() => resolveError(setErrorMsg, "password")}
            msg={errorMsg.password}
          />
          {/* <div className=" w-full flex justify-end relative -mt-[.5rem]">
            <p
              onClick={() => router.push("/forgot-password")}
              className=" text-[12px] absolute  text-[#a7a9a8] transition-all duration-250 hover:text-[12.5px] cursor-pointer "
            >
              Forgot Password?
            </p>
          </div> */}
          <button
            onClick={handleLogin}
            className=" w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1.5rem] rounded-md bg-[#1f2123] hover:bg-[#1f2123]/90 transition-all duration-250 text-[14px] font-semibold"
          >
            Login
          </button>
          <div className="w-full flex items-center justify-center gap-[8px] mt-[1rem]">
            <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
            <p className=" text-[14px] text-[#a7a9a8] ">Instan Login</p>
            <div className=" h-[.8px] w-[35%] bg-[#a7a9a8]"></div>
          </div>
          <button
            onClick={() => handleGoogleLogin()}
            className="w-full cursor-pointer hover:scale-[1.02] h-[45px] mt-[1rem] flex items-center justify-center gap-[.6rem] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.1)] text-[#898d96]  transition-all duration-250 text-[14px] "
          >
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
