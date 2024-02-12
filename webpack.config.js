// change webpack default config
const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

if ( process.env.NODE_ENV !== 'production' ) {
	// defaultConfig.devServer.hot = true;
	// defaultConfig.devServer.client= {webSocketURL:'wss://nick-notas.duckdns.org:8887/ws'};
	defaultConfig.devServer.host = 'altius.duckdns.org';
	defaultConfig.devServer.server = {
		type: 'https',
		options: {
			cert: 'C:/Wamp.NET/servers/2-apache-2.4.57/conf/vhosts/altius.duckdns.org.crt',
			key: 'C:/Wamp.NET/servers/2-apache-2.4.57/conf/vhosts/altius.duckdns.org.key',
		},
	};
	defaultConfig.experiments = { backCompat: false };

	// defaultConfig.devServer.client = {logging: 'verbose'};

	defaultConfig.devServer.allowedHosts = [
		'altius.duckdns.org',
		'localhost',
		'127.0.0.1',
	];
}

// defaultConfig.optimization.runtimeChunk = 'single';

module.exports = defaultConfig;
