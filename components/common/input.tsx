"use client";
import React, { useState } from "react";
import { InputProps } from "../types/types";

function Input(inputProps: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="w-full">
      {inputProps.title && (
        <p
          className={` text-[14px] ${
            isFocused ? "text-[#1c1d4e]" : "text-[#a7a9a8]"
          }`}
        >
          {inputProps.title}
        </p>
      )}

      <input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={inputProps.placeholder}
        className={`text-[#1c1d4e] text-[14px] placeholder:text-[#a7a9a8] w-full h-[45px] border-[1.5px] border-solid ${
          isFocused ? "border-[#1c1d4e]" : "border-[#a7a9a8]"
        }  outline-none px-[4px] rounded-md mt-[.5rem]`}
      />
    </div>
  );
}

export default Input;
