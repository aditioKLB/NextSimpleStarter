const withOffline = require('next-offline');
const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
	throw dotEnvResult.error;
}

module.exports = withOffline({
	target: process.env.NEXT_TARGET || 'serverless',
	workboxOpts: {
		swDest: 'static/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /[.](png|jpg|ico|css)/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'assets-cache',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			},
			{
				urlPattern: /^https:\/\/code\.getmdl\.io.*/,
				handler: 'CacheFirst',
				options: {
					cacheName: 'lib-cache'
				}
			},
			{
				urlPattern: /^http.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'http-cache'
				}
			}
		]
	},
	webpack: (config, { dev }) => {
		if (dev) {
			config.module.rules.push({
				test: /\.js$/,
				exclude: ['/node_modules/', '/.next/'],
				loader: 'eslint-loader',
				enforce: 'pre'
			});
		}
		return config;
	},
	env: {
		ARTICLE_URL: process.env.ARTICLE_URL,
		ARTICLE_USERNAME: process.env.ARTICLE_USERNAME,
		ARTICLE_PASSWORD: process.env.ARTICLE_PASSWORD
	}
});
