import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="pokemon-loader">
				<img
					src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OSUQFNVkGUnyCJU2YjmrxoaKbdy0GH.png"
					alt="Loading Pokémon"
					className="w-32 h-32 pikachu-fade-in bg-inherit rounded-full"
				/>
			</div>
			<div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
				<Loader2 className="h-5 w-5 animate-spin" />
				<span className="text-lg font-medium">
					ポケモンデータを読み込み中...
				</span>
			</div>
		</div>
	);
}
