import { withOpacity } from "@/components/helper/helper";
import { ArrowDown } from "lucide-react";

type StatItem = {
  label: string;
  value: number | string;
};

type StatsCardProps = {
  title: string;
  percentage: string;
  textColor?: string;
  backgroundColor?: string;
  stats: StatItem[];
  showArrow?: boolean;
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  percentage,
  textColor = "#db8d2b",
  backgroundColor = "#fff6e9",
  stats,
  showArrow = true,
}) => {
  return (
    <div className="flex flex-col items-center gap-[.5rem]">
      <div
        className="w-[200px] h-[180px] rounded-[25px] relative pt-[1rem] px-[.5rem]"
        style={{ backgroundColor }}
      >
        {showArrow && (
          <span
            className="absolute right-[8px] top-[15px] transition-transform duration-200 hover:translate-y-[2px]"
            style={{ color: textColor }}
          >
            <ArrowDown size={14} />
          </span>
        )}

        <p
          className="text-[40px] text-center font-semibold"
          style={{ color: textColor }}
        >
          {percentage}
        </p>

        <div className="w-full mt-[.5rem] flex items-center gap-[1rem] justify-center">
          {stats.map((item, index) => (
            <div key={index}>
              <span
                className="block h-[50px] w-[70px] rounded-[8px] flex items-center justify-center text-[1.2rem] font-semibold"
                style={{
                  color: textColor,
                  backgroundColor: withOpacity(textColor, 0.05),
                }}
              >
                {item.value}
              </span>

              <p className="text-[12px] text-center text-nowrap mt-[.4rem] text-[#2a2a2a] font-semibold">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[#2a2a2a] font-semibold">{title}</p>
    </div>
  );
};

export default StatsCard;
