module.exports = {
	schema: "http://localhost:4000",
	documents: "./src/**/*.graphql",
	generates: {
		"./src/hooks/generated.ts": {
			plugins: [
				"typescript",
				"typescript-operations",
				"typescript-graphql-request"
			],
			config: {
				fetcher: "graphql-request"
			}
		}
	}
}
