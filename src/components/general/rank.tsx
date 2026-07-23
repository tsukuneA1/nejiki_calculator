import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useId } from "react";
type RankProps = {
  rank: number;
  label: string;
  setRank: (rank: number) => void;
};

export const Rank = ({ rank, label, setRank }: RankProps) => {
  const fieldId = useId();

  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select
        value={rank.toString()}
        onValueChange={(value) => setRank(Number(value))}
      >
        <SelectTrigger id={fieldId} className="w-full">
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
