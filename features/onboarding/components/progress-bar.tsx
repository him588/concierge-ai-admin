function ProgressBar({ currentStep = 1 }) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center w-full gap-[2px] mt-[20px]">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-[2px] ">
          {/* Circle */}
          <div
            className={`h-[40px] w-[40px] rounded-full border-[1.5px]
            flex items-center justify-center font-semibold
            ${
              step <= currentStep
                ? "bg-[#1c1d4e] text-white border-[#1c1d4e]"
                : "border-[#1c1d4e]/50 bg-[#1c1d4e]/15 text-[#1c1d4e]/50"
            }`}
          >
            {step}
          </div>

          {/* Line (only between steps) */}
          {index !== steps.length - 1 && (
            <div
              className={`h-[2px] w-[150px] flex  rounded-sm ${
                currentStep <= index + 1 ? "bg-[#1c1d4e]/15" : "bg-[#1c1d4e]"
              }
              `}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
