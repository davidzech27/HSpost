/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Inter",
					"-apple-system",
					"BlinkMacSystemFont",
					"Segoe UI",
					"Roboto",
					"Helvetica",
					"Arial",
					"sans-serif"
				]
			},
			colors: {
				background: "#03080C",
				"faint-border": "#434E60",
				"medium-border": "#596375",
				"bold-border": "#B2B9C9",
				"faint-surface": "#060D19",
				"medium-surface": "#0E1420",
				"bold-surface": "#0E1420",
				"main-text": "#EFEFEF",
				"sub-text": "#9F9F9F"
			}
		}
	},
	plugins: []
}
