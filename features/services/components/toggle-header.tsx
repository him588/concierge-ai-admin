"use state";
import { useServiceContext } from "@/context/service-context";

function ToggleHeader() {
  // const [section, setSection] = useState<"Services" | "Staff">("Services");
  const { activeTab, setActiveTab } = useServiceContext();

  return (
    <div className="absolute w-[60%] h-[48px] bg-slate-200 rounded-full p-1 absolute -top-[4.5rem]">
      {/* Sliding Indicator */}
      <div
        className={`absolute top-1 left-1 h-[40px] w-[calc(50%-0.25rem)]
            rounded-full bg-white shadow transition-transform duration-300 ease-in-out
            ${activeTab === "Staff" ? "translate-x-full" : "translate-x-0"}`}
      />

      {/* Buttons */}
      <div className="relative z-10 flex h-full">
        <button
          onClick={() => setActiveTab("Services")}
          className={`w-1/2 cursor-pointer text-sm hover:text-md font-semibold transition-colors
              ${activeTab === "Services" ? "text-slate-900" : "text-slate-600"}`}
        >
          Services
        </button>

        <button
          onClick={() => setActiveTab("Staff")}
          className={`w-1/2 cursor-pointer text-sm hover:text-md  font-semibold transition-all
              ${activeTab === "Staff" ? "text-slate-900" : "text-slate-600"}`}
        >
          Staff
        </button>
      </div>
    </div>
  );
}

export default ToggleHeader;
