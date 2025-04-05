import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Move } from '@/types/move';

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
      className={`my-2 max-w-xs cursor-pointer transition-all duration-300 
        ${isSelected ? 'border-2 border-blue-500 bg-blue-100 shadow-lg hover:scale-105' : 'hover:scale-105'}
      `}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>{move.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <div className="flex items-center space-x-1">
          <Badge>タイプ</Badge>
          <span>{move.type}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>威力</Badge>
          <span>{move.power ?? 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>命中率</Badge>
          <span>{move.accuracy ?? 'N/A'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Badge>分類</Badge>
          <span>{move.classification}</span>
        </div>
      </CardContent>
    </Card>
  );
};
