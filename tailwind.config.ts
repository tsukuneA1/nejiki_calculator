/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "375px", // 例: カスタムブレークポイント
			},
		},
	},
	plugins: [],
};
