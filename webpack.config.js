// change webpack default config
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

if ( process.env.NODE_ENV !== 'production' ) {
	// defaultConfig.devServer.hot = true;
	// defaultConfig.devServer.client= {webSocketURL:'wss://nick-notas.duckdns.org:8887/ws'};
	defaultConfig.devServer.host = 'dancelib';
	defaultConfig.devServer.server = {
		type: 'https',
		options: {
			cert: 'C:/Wamp.NET/servers/2-apache-2.4.57/conf/vhosts/dancelib.crt',
			key: 'C:/Wamp.NET/servers/2-apache-2.4.57/conf/vhosts/dancelib.key',
		},
	};
	defaultConfig.experiments = { backCompat: false };

	// defaultConfig.devServer.client = {logging: 'verbose'};

	defaultConfig.devServer.allowedHosts = [
		'dancelib',
		'localhost',
		'127.0.0.1',
	];
}

// defaultConfig.optimization.runtimeChunk = 'single';

module.exports = defaultConfig;
