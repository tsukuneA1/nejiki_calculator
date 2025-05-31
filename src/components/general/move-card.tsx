import type { Move } from "@/types/move";
import { TypeBadge } from "./type-badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
		<Card
			className={`my-2 max-w-xs cursor-pointer transition-all duration-300 p-2 rounded-lg gap-2
        ${isSelected ? "border-2 border-blue-500 bg-blue-100 shadow-lg hover:scale-105" : "hover:scale-105"}
      `}
			onClick={handleClick}
		>
			<CardHeader className="px-0 mb-0 pb-0 gap-y-0">
				<CardTitle>{move.name}</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center gap-2 px-0 mt-0 pt-0">
				<TypeBadge type={move.type} />
				<span>威力{move.power}</span>
				<span>{move.classification}</span>
				{/* <div className="flex items-center space-x-1">
          <Badge>タイプ</Badge>
          <span className="text-sm">{move.type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>威力</Badge>
          <span className="text-sm">{move.power ?? 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>命中率</Badge>
          <span className="text-sm">{move.accuracy ?? 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>分類</Badge>
          <span className="text-sm">{move.classification}</span>
        </div> */}
			</CardContent>
		</Card>
	);
};
