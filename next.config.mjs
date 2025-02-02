import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		esmExternals: true,
	},
	output: 'standalone',
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
			};
		}
		config.resolve.alias = {
			...config.resolve.alias,
			punycode: false,
		};
		return config;
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "seo-heist.s3.amazonaws.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dwdwn8b5ye.ufs.sh",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "ansubkhan.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/**",
			},
		],
	},
	pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);