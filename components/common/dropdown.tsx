import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type ReusableDropdownProps<T extends string> = {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
};

function ReusableDropdown<T extends string>({
  options,
  value,
  onChange,
}: ReusableDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* 🔹 Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* 🔹 Close on ESC key */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center cursor-pointer gap-1 text-blue-600 text-sm font-medium
                   px-2 py-1 rounded-md hover:bg-blue-50 
                   transition"
      >
        {value}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-[9rem] bg-white border rounded-xl
                    shadow-lg z-20 overflow-hidden
                    transition-all duration-200 origin-top
                    ${
                      open
                        ? "scale-100 opacity-100 translate-y-0"
                        : "scale-95 opacity-0 -translate-y-1 pointer-events-none"
                    }`}
      >
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            className={`w-full text-left px-3 cursor-pointer py-2 text-sm transition
                        hover:bg-blue-50 active:bg-blue-100
                        ${
                          option === value
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReusableDropdown;
