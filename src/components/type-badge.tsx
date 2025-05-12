import { TypeItems } from '@/constants/types';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export const TypeBadge = ({ type }: { type: string }) => {
  const typeItem = TypeItems.find((item) => item.type === type);
  return (
    <Badge
      className={`text-sm text-white font-semibold rounded-sm p-0 border-none bg-white gap-0`}
    >
      <div className={`p-1 ${typeItem?.color}`}>
        <Avatar className="w-4 h-4">
          <AvatarImage src={typeItem?.icon} alt={typeItem?.type} />
          <AvatarFallback>{typeItem?.type.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </div>
      <span className="p-1 h-6 w-16 bg-primary flex justify-center items-center">{typeItem?.type}</span>
    </Badge>
  );
};
