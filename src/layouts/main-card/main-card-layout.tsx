import { Card, CardContent } from "@/components/ui/card";

export const MainCardLayout = ({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Card className="w-full gap-0 py-0 md:w-lg">
      <div className="flex items-center justify-between px-4 pt-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
        {header}
      </div>
      <CardContent className="space-y-4 p-4">{content}</CardContent>
    </Card>
  );
};
