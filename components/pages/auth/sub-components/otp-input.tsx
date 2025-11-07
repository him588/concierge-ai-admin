import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

type OTPInputProps = {
  length?: number;
  autoFocus?: boolean;
  className?: string;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  autoFocus = true,
  className = "",
  onChange,
  onComplete,
}) => {
  // values array
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));

  // refs for inputs
  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    Array(length).fill(null)
  );

  // keep parent informed when values change
  useEffect(() => {
    const otp = values.join("");
    onChange?.(otp);
    if (otp.length === length && !values.includes("")) {
      onComplete?.(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]); // onChange/onComplete are callbacks; include them if you want to re-run when they change

  // autofocus first input
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
      inputsRef.current[0]?.select();
    }
  }, [autoFocus]);

  const focusInput = (index: number) => {
    const el = inputsRef.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const raw = e.target.value;
    // allow digits only and take only first character
    const digit = raw.replace(/\D/g, "").slice(0, 1);

    setValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });

    if (digit && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault(); // keep behavior consistent
      setValues((prev) => {
        const next = [...prev];
        if (next[index]) {
          // clear current if it has value
          next[index] = "";
        } else if (index > 0) {
          // move back and clear previous
          next[index - 1] = "";
          focusInput(index - 1);
        }
        return next;
      });
    } else if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    setValues((prev) => {
      const next = [...prev];
      for (let i = 0; i < length; i++) {
        next[i] = paste[i] ?? "";
      }
      return next;
    });

    // focus next empty (or last)
    const nextIndex = Math.min(paste.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div className={`flex gap-[1rem] ${className}`}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={values[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          maxLength={1}
          inputMode="numeric"
          pattern="\d*"
          aria-label={`OTP digit ${index + 1}`}
          className="h-[45px] w-[45px] text-center text-[#1c1d4e] font-semibold text-[18px] border-[2px] rounded-md border-[#1c1d4e] outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;
