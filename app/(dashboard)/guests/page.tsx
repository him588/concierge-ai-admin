"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

function Page() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [list, setList] = useState([]);
  // const [pages, setPages] = useState([1, 2, 3, 4, 5]);
  // const [totalPages, setTotalPages] = useState(5);

  // useEffect(() => {
  //   async function fetchPostData() {
  //     setLoading(true);
  //     setList([]);
  //     try {
  //       const response = await fetch(
  //         `https://rickandmortyapi.com/api/character?page=${currentPage}&pageSize=${12}`,
  //       );
  //       const data = await response.json();
  //       setTotalPages(data.info.pages);
  //       setList(data.results);
  //       console.log(data);
  //     } catch (error) {
  //       console.log("Error while fetching list", error);
  //       setError(`Error while fetching list at page ${currentPage}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchPostData();
  // }, [currentPage]);

  // useEffect(() => {
  //   const visiblePages = 5;
  //   let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  //   console.log("start 1", start);
  //   let end = start + visiblePages - 1;
  //   console.log("end 1", end);

  //   if (end > totalPages) {
  //     end = totalPages;
  //     console.log("end 2", end);

  //     start = Math.max(1, end - visiblePages + 1);
  //     console.log("start 2", start);
  //   }

  //   const pagesArray = [];
  //   for (let i = start; i <= end; i++) {
  //     pagesArray.push(i);
  //   }

  //   setPages(pagesArray);
  // }, [currentPage, totalPages]);

  // function handlePrevious() {
  //   if (currentPage === 1) {
  //     alert("Unable to proceed your request");
  //     return;
  //   }
  //   setCurrentPage((prev) => prev - 1);
  // }

  // function handleNext() {
  //   if (totalPages <= currentPage) {
  //     alert("Unable to move you to next page");
  //     return;
  //   }
  //   setCurrentPage((prev) => prev + 1);
  // }

  const [input, setInput] = useState("");
  const debounceRef = useRef<(value: string) => void>(null);
  function debounceFuction(fn: (value: string) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return function (value: string) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(value), delay);
    };
  }

  useEffect(() => {
    if (!debounceRef.current) {
      debounceRef.current = debounceFuction((value: string) => {
        console.log(value);
      }, 1000);
    }
    debounceRef.current(input);
  }, [input]);

  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          console.log("intersection works");
        }
      },
      { threshold: 0.05 },
    );
    if (componentRef.current) observer.observe(componentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className=" min-h-screen w-full flex flex-col ">
      {/* <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      /> */}
      {/* <div className="h-[400px] w-[400px] ">
        <div className=" h-[90%] overflow-scroll">
          {error && <p className="text-[red] font-semibold">{error}</p>}
          {loading && <p className="text-black">Loading ...</p>}
          {list.length === 0 && !loading && (
            <p className=" text-green-400 font-semibold">
              There is no entries to dispaly
            </p>
          )}
          {list.map((item, index) => (
            <div key={index} className="text-black">
              {item.name}
            </div>
          ))}
        </div>
        <div className=" flex gap-[1rem] items-center ">
          <p
            onClick={handlePrevious}
            className="cursor-pointer text-black transition-all duration-200 hover:scale-[1.1]"
          >
            Previos
          </p>
          <div className=" flex gap-[.5rem]">
            {pages.map((page) => (
              <div
                className={` h-[1.5rem] w-[1.5rem] rounded-full flex items-center justify-center  text-black cursor-pointer transition-all duration-200 hover:scale-[1.1] ${page === currentPage ? "bg-gray-500" : "bg-gray-200"}`}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page}
              </div>
            ))}
          </div>
          <p
            onClick={handleNext}
            className="cursor-pointer text-black transition-all duration-200 hover:scale-[1.1]"
          >
            Next
          </p>
        </div>
      </div> */}
      <Stopwatch />
      <div className="h-[300vh]"></div>
      <div ref={componentRef} className="h-[100vh] bg-[pink]"></div>
    </section>
  );
}

export default Page;

// import { useEffect, useState } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{formatTime()}</h1>

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}
