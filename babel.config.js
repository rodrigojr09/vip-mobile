module.exports = (api) => {
	api.cache(false);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						"@/components": "./components",
						"@/hooks": "./hooks",
						"@/utils": "./utils",
						"@/scripts": "./scripts",
						"@/types": "./types",
						"@/app": "./app",
						"@/assets": "./assets",
					},
					extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
				},
			],
		],
	};
};
