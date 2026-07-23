import { TypeItems } from "@/constants/types";

export const TypeBadge = ({ type }: { type: string }) => {
  const typeItem = TypeItems.find((item) => item.type === type);
  return (
    <span
      className={`${typeItem?.color} rounded px-1.5 py-0.5 text-xs font-medium text-white`}
    >
      {type}
    </span>
  );
};
