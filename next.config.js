const remarkSlug = require("remark-slug");
// eslint-disable-next-line import/order
const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [remarkSlug],
	},
});

module.exports = withMDX({
	target: "serverless",
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
						titleProp: true,
					},
				},
			],
		});

		return config;
	},
	async headers() {
		return [
			{
				source: "/foobar",
				headers: [
					{
						key: "x-foobar",
						value: "/foobar/headers", // Matched parameters can be used in the value
					},
				],
			},
		];
	},
});
