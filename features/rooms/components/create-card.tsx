import { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type CreateCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
  backgroundColor: string;
  onClick?: () => void;
  className?: string;
};

export default function CreateCard({
  title,
  description,
  icon: Icon,
  accentColor,
  backgroundColor,
  onClick,
  className,
}: CreateCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={twMerge(
        "group flex h-48 w-[33%] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-md",
        "active:translate-y-0 active:shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
      style={{
        borderColor: accentColor,
        backgroundColor,
        // focus ring color
        boxShadow: `0 0 0 0 transparent`,
      }}
    >
      {/* Icon wrapper */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed
          transition-all duration-300
           group-hover:scale-105"
        style={{ borderColor: accentColor }}
      >
        <Icon
          size={22}
          color={accentColor}
          className="transition-transform duration-300"
        />
      </div>

      {/* Text */}
      <div className="text-center transition-colors duration-300">
        <p className="text-sm font-medium" style={{ color: accentColor }}>
          {title}
        </p>
        <p className="text-xs text-gray-500 group-hover:text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
}
