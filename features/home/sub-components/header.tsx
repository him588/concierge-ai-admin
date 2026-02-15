import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [{ name: "Problem" }, { name: "Solution" }, { name: "Team" }];

  return (
    <div className="w-full text-[#153a43] relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-[1.5rem] md:p-[2rem] bg-white">
        <p className="text-[1.5rem] md:text-[2rem] font-bold">Concierge AI</p>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-[1.5rem] items-center">
          {links.map((link, i) => (
            <p
              key={i}
              className="font-semibold cursor-pointer transition-all duration-100 hover:scale-[1.05]"
            >
              {link.name}
            </p>
          ))}
          <button className="font-semibold rounded-full py-[.65rem] px-[2rem] bg-[#ff7c4d] text-white">
            Login
          </button>
          <button className="font-semibold rounded-full py-[.65rem] px-[2rem] bg-[#ff7c4d] text-white">
            Hire Me
          </button>
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col gap-[5px] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-[25px] h-[3px] bg-[#153a43]"></span>
          <span className="w-[25px] h-[3px] bg-[#153a43]"></span>
          <span className="w-[25px] h-[3px] bg-[#153a43]"></span>
        </div>
      </div>

      {/* Mobile Menu (ABSOLUTE) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center gap-[1.2rem] py-[1.5rem]">
          {links.map((link, i) => (
            <p
              key={i}
              className="font-semibold cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </p>
          ))}
          <button className="font-semibold rounded-full py-[.6rem] px-[2rem] bg-[#ff7c4d] text-white">
            Login
          </button>
          <button className="font-semibold rounded-full py-[.6rem] px-[2rem] bg-[#ff7c4d] text-white">
            Hire Me
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
