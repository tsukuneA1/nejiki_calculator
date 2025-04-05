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
      className={`my-2 max-w-md cursor-pointer transition-all duration-300 
        ${isSelected ? 'border-2 border-blue-500 bg-blue-100 shadow-lg hover:scale-105' : 'hover:scale-105'}
      `}
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>{move.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <strong>
          <Badge>タイプ</Badge> {move.type} <Badge>分類</Badge>{' '}
          {move.classification} <Badge>威力</Badge> {move.power ?? 'N/A'}{' '}
          <Badge>命中率</Badge> {move.accuracy ?? 'N/A'}
        </strong>
        {isSelected}
      </CardContent>
    </Card>
  );
};
