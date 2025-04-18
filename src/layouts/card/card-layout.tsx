import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const CardLayout = ({
  header,
  content,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Card className="my-2 w-xs max-w-xl sm:w-xl">
      <CardHeader className="flex items-center px-4">{header}</CardHeader>
      <CardContent className="space-y-2 px-4">{content}</CardContent>
    </Card>
  );
};
