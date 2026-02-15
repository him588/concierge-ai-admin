"use client";
import React, { useState } from "react";
import Header from "./sub-components/header";
import Hero from "./sub-components/hero";

interface CardProp {
  id: string;
  confidence: number;
  content: string;
}

function LandingPage() {
  const [data, setData] = useState<CardProp[]>([
    {
      id: "A1B2C3",
      confidence: 0.92,
      content: "This is a highly confident response.",
    },
    {
      id: "X9Y8Z7",
      confidence: 0.75,
      content: "This response is moderately reliable.",
    },
    {
      id: "QWERTY",
      confidence: 0.63,
      content: "This answer may need verification.",
    },
    {
      id: "LMN456",
      confidence: 0.88,
      content: "Strong confidence in this output.",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <Header />
      <Hero />
      <div className=" h-[500vh] bg-[gray]"></div>
      {/* <div className="h-[95vh] w-[50vw] bg-white shadow-xl rounded-2xl p-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 p-2">
          {data.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No data yet. Start asking 👇
            </p>
          ) : (
            data.map((item) => <Card key={item.id} {...item} />)
          )}
        </div>

        <div className="flex gap-3 h-[60px] mt-4">
          <input
            type="text"
            placeholder="Ask something..."
            className="flex-1 border border-gray-300 rounded-lg px-4 outline-none focus:ring-2 focus:ring-[#425b73]"
          />
          <button className="px-6 bg-[#425b73] text-white rounded-lg hover:bg-[#36495c] transition">
            Ask
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default LandingPage;

function Card({ id, confidence, content }: CardProp) {
  return (
    <div className="p-4 cursor-pointer bg-[#f9fbff] border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-sm text-gray-500">ID</p>
      <p className="text-lg font-semibold text-[#425b73]">{id}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">Confidence</span>
        <span className="text-sm font-medium text-green-600">
          {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      <p className="text-black">{content}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="h-2 rounded-full bg-[#425b73]"
          style={{ width: `${confidence * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
