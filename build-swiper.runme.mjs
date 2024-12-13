/* eslint-disable */

import fs from 'fs';
// import path from 'path';

const curdir = import.meta.dirname;

try {
	fs.mkdirSync( curdir + '/build/swiper' );
	fs.copyFileSync(
		curdir + '/node_modules/swiper/swiper-bundle.min.js',
		curdir + '/build/swiper/swiper-bundle.min.js'
	);
	fs.copyFileSync(
		curdir + '/node_modules/swiper/swiper-bundle.min.css',
		curdir + '/build/swiper/swiper-bundle.min.css'
	);
	console.log( 'Everything is copied!' );
} catch ( err ) {
	console.error( 'Error copying file:', err );
}
