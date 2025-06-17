module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					alias: {
						"@": "./src", // ou './' se você não usa pasta /src
					},
				},
			],
		],
	};
};
