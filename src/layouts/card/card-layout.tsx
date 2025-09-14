import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CardLayout = ({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Card className="my-2 max-w-xl border-none">
      <CardHeader className="flex items-center border rounded-lg px-2 py-2">
        {header}
      </CardHeader>
      <CardContent className="space-y-2 px-0 shadow-none border-none">
        {content}
      </CardContent>
    </Card>
  );
};
