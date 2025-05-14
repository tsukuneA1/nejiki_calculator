import { Card, CardContent } from "@/components/ui/card";
import type { CardStyle } from "@/types/cardStyle";

export const MainCardLayout = ({
	cardStyle,
	header,
	content,
}: {
	cardStyle: CardStyle;
	header: React.ReactNode;
	content: React.ReactNode;
}) => {
	return (
		<Card className={`${cardStyle.cardStyle} py-0 gap-0`}>
			<div
				className={`flex items-center rounded-t-lg ${cardStyle.headerStyle}`}
			>
				{header}
			</div>
			<CardContent className="p-4 space-y-4">{content}</CardContent>
		</Card>
	);
};
