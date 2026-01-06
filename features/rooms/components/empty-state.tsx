import { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function EmptyState({
  title,
  description,
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 h-[250px] shadow-sm text-center text-gray-500">
      <Icon size={28} className="text-[#1c1d4e]" />
      <p className="text-sm text-[#1c1d4e] font-medium">{title}</p>
      <p className="text-xs text-[#1c1d4e]">{description}</p>
    </div>
  );
}
