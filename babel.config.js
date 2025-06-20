module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						// Exemplo de aliases:
						"@components": "./src/components",
						"@screens": "./src/screens",
					},
				},
			],
		],
	};
};
