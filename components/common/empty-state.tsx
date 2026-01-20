/* eslint-disable @next/next/no-img-element */
import React from "react";
import { twMerge } from "tailwind-merge";

type EmptyStateProps = {
  imageSrc?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
  buttonClassName?: string;
};

function EmptyState({
  imageSrc = "/empty.svg",
  title = "No Services Found",
  description = "This property doesn’t have any services yet.",
  buttonText,
  onButtonClick,
  className,
  buttonClassName,
}: EmptyStateProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full flex flex-col items-center justify-center text-center px-4",
        className,
      )}
    >
      <img src={imageSrc} alt={title} className="w-64 md:w-72 " />

      <h2 className="text-2xl font-semibold text-[black] mb-2">{title}</h2>

      <p className="text-[#8aa6b1] max-w-md mb-6">{description}</p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className={twMerge(
            "px-6 py-3 rounded-xl bg-[#83cc9a] hover:bg-[#83cc9a]/90 cursor-pointer text-white font-medium shadow-md transition-all duration-200",
            buttonClassName,
          )}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
