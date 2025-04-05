import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Move } from "@/types/move";

export const MoveCard = ({ move }: { move: Move }) => {
  const [selected, setSelected] = useState(false);

  return (
    <Card
      className={`my-2 max-w-md cursor-pointer transition-all duration-300 
        ${selected ? "border-2 border-blue-500 bg-blue-100 shadow-lg hover:scale-105" : "hover:scale-105"}
      `}
      onClick={() => setSelected((prev) => !prev)}
    >
      <CardHeader>
        <CardTitle>{move.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          <Badge>タイプ</Badge> {move.type} <Badge>分類</Badge> {move.classification} <Badge>威力</Badge> {move.power ?? 'N/A'} <Badge>命中率</Badge> {move.accuracy ?? 'N/A'}
        </strong>
      </CardContent>
    </Card>
  );
};
