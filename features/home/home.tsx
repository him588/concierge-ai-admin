"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "./sub-components/header";
import Hero from "./sub-components/hero";
import axios from "axios";

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
  const [input, setInput] = useState("");
  const containerRef = useRef(null);
  const [count, setCount] = useState(1);

  const [pagesList, setPagesList] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(10);
  const totalPages = 10;

  const PAGE_WINDOW = 5;

  const pages = useMemo(() => {
    let start = currentPage - Math.floor(PAGE_WINDOW / 2);
    let end = currentPage + Math.floor(PAGE_WINDOW / 2);

    // Fix when near start
    if (start < 1) {
      start = 1;
      end = PAGE_WINDOW;
    }

    // Fix when near end
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - PAGE_WINDOW + 1;
    }

    // Extra safety
    if (start < 1) start = 1;

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  useEffect(() => {
    console.log(pages);
  }, [pages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(input);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:4000/",
        { query: input },
        {},
      );
      console.log(response);
    } catch (error) {
      console.log("Error while calling api", error);
    }
  }

  useEffect(() => {
    if (containerRef.current === null) return;
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting) {
          setCount((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <Header />
      <Hero />

      <div className=" h-[100vh] bg-[gray]"></div>
      <div
        ref={containerRef}
        className="h-[95vh] w-[50vw] bg-white shadow-xl rounded-2xl p-6 flex flex-col"
      >
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 text-black rounded-lg px-4 outline-none focus:ring-2 focus:ring-[#425b73]"
          />
          <button
            onClick={handleSubmit}
            className="px-6 bg-[#425b73] text-white rounded-lg hover:bg-[#36495c] transition"
          >
            Ask
          </button>
        </div>
      </div>

      <div className=" flex items-center justify-center">
        <p>Prev</p>
      </div>
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
