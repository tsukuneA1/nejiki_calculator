import type { CardStyle } from "@/types/cardStyle";

export const CardTypeStyles: CardStyle[] = [
  {
    type: "Attacker",
    cardStyle: "border-red-200 dark:border-red-900/50 shadow-sm",
    headerStyle:
      "bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg",
  },
  {
    type: "Defender",
    cardStyle: "border-green-200 dark:border-green-900/50 shadow-sm",
    headerStyle:
      "bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg",
  },
  {
    type: "Environment",
    cardStyle: "border-blue-200 dark:border-blue-900/50 shadow-sm",
    headerStyle:
      "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg",
  },
];
