// change webpack default config (for modules)
const [
	defaultConfig,
	moduleConfig,
] = require( '@wordpress/scripts/config/webpack.config.js' );
// import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
// eslint-disable-next-line import/no-extraneous-dependencies
require( 'dotenv' ).config();
// import 'dotenv/config';

/* Either define host, cert_location and key_location in .env
	or encode strings here to use https and hot reload under https.
	Alternatively, remove this config file  */

if ( process.env.NODE_ENV !== 'production' ) {
	defaultConfig.devServer.host = process.env.host;
	defaultConfig.devServer.server = {
		type: 'https',
		options: {
			cert: process.env.cert_location,
			key: process.env.key_location,
		},
	};
	// defaultConfig.experiments = { backCompat: false };

	defaultConfig.devServer.allowedHosts = [
		process.env.host,
		'localhost',
		'127.0.0.1',
	];
}

// defaultConfig.optimization.runtimeChunk = 'single';

module.exports = [ defaultConfig, moduleConfig ];
