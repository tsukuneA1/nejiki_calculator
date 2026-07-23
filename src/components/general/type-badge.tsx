import { TypeItems } from "@/constants/types";

export const TypeBadge = ({ type }: { type: string }) => {
  const typeItem = TypeItems.find((item) => item.type === type);
  return (
    <span
      className="rounded px-1.5 py-0.5 text-xs font-medium text-white"
      style={{ backgroundColor: typeItem?.color ?? "#888" }}
    >
      {type}
    </span>
  );
};
