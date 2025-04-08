import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type RankProps = {
  rank: number;
  badgeName: string;
  setRank: (rank: number) => void;
};

export const Rank = ({ rank, badgeName, setRank }: RankProps) => {
  return (
    <div className="flex items-center gap-2">
      <Badge className="w-18 h-9">{badgeName}</Badge>
      <Select
        value={rank.toString()}
        onValueChange={(value) => setRank(Number(value))}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="ランク補正を選択" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>ランク補正</SelectLabel>
            {[...Array(13)].map((_, i) => {
              const val = (i - 6).toString();
              return (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
