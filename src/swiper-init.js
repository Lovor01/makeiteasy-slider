/**
 * Swiper initialization script
 *
 * @since 1.0.0
 * @author Lovro Hrust
 */

/**
 * @todo trim down swiper if possible, do not import everything like it is now
 */

// // import Swiper bundle with all modules installed
// import Swiper from 'swiper/bundle';

// // import styles bundle
// import 'swiper/css/bundle';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// polyfill
// if (window.NodeList && !NodeList.prototype.forEach) {
// 	NodeList.prototype.forEach = Array.prototype.forEach;
// }

if ( document.readyState === 'loading' )
	document.addEventListener( 'DOMContentLoaded', domReady );
else domReady();

function domReady() {
	const swiperInstances = document.querySelectorAll( '.swiper' );
	if ( swiperInstances )
		swiperInstances.forEach( function ( el ) {
			const parsedSettings = JSON.parse( el.dataset.settings );
			const modules = [];
			if ( parsedSettings.pagination ) modules.push( Pagination );
			if ( parsedSettings.navigation ) modules.push( Navigation );
			if ( parsedSettings.autoplay ) modules.push( Autoplay );

			const settings = { ...parsedSettings, modules, grabCursor: true };
			new Swiper( el, settings );
		} );
}
