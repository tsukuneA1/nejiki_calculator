import { Card, CardContent } from "@/components/ui/card";

export const MainCardLayout = ({
	header,
	content,
}: {
	header: React.ReactNode;
	content: React.ReactNode;
}) => {
	return (
		<Card className={"py-0 gap-0 w-full md:w-lg"}>
			<div
				className={
					"flex items-center rounded-t-lg bg-primary text-primary-foreground text-white"
				}
			>
				{header}
			</div>
			<CardContent className="p-4 space-y-4">{content}</CardContent>
		</Card>
	);
};
