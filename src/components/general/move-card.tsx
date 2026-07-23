import type { Move } from "@/types/move";
import { TypeBadge } from "./type-badge";

export const MoveCard = ({
  move,
  handleMoveChange,
  isSelected,
}: {
  move: Move;
  handleMoveChange: (move: Move) => void;
  isSelected: boolean;
}) => {
  const handleClick = () => {
    handleMoveChange(move);
  };

  return (
    <button
      type="button"
      className={`w-full rounded-md border px-3 py-2 text-left transition-colors ${
        isSelected
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-background hover:bg-muted/50"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{move.name}</span>
        <TypeBadge type={move.type} />
      </div>
      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
        <span>{move.classification}</span>
        <span>威力 {move.power || "—"}</span>
        <span>命中 {move.accuracy || "—"}</span>
      </div>
    </button>
  );
};
