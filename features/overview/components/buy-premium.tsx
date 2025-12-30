import { Heart } from "lucide-react";

export default function SupportCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-[#fff7e6] p-5 shadow-sm border border-[#fde3b0]">
      <h2 className="text-center text-sm font-semibold text-[#3b2f2f]">
        SUPPORT THE PROJECT
      </h2>

      <p className="mt-2 text-center text-xs text-[#6b4f4f]">
        If you enjoy using this app, consider supporting the development ☕
      </p>

      <div className="mt-4 flex justify-center">
        <button className="flex items-center gap-2 rounded-full bg-[#ffdd00] px-5 py-2 text-sm font-semibold text-black shadow transition hover:scale-105 hover:bg-[#ffd400]">
          Support Me
          <Heart size={14} className="fill-red-500 text-red-500" />
        </button>
      </div>
    </div>
  );
}
