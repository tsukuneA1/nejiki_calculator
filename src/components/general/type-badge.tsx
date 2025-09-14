import { TypeItems } from "@/constants/types";

export const TypeBadge = ({ type }: { type: string }) => {
  const typeItem = TypeItems.find((item) => item.type === type);
  return (
    <span className={`${typeItem?.color} text-white px-2 py-1 rounded text-sm`}>
      {type}
    </span>
  );
};
