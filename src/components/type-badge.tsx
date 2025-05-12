import { TypeItems } from '@/constants/types';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export const TypeBadge = ({ type }: { type: string }) => {
  const typeItem = TypeItems.find((item) => item.type === type);
  return (
    <Badge
      className={`text-sm ${typeItem?.color} text-white font-semibold px-2 py-1 rounded-full`}
    >
      <Avatar className="w-4 h-4 mr-1">
        <AvatarImage
          src={typeItem?.icon}
          alt={typeItem?.type}
          className="w-4 h-4"
        />
        <AvatarFallback>{typeItem?.type.slice(0, 2)}</AvatarFallback>
      </Avatar>
      {typeItem?.type}
    </Badge>
  );
};
