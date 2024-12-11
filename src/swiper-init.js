/* eslint-disable import/no-unresolved */
/**
 * Swiper initialization script
 *
 * @since 1.0.0
 * @author Lovro Hrust
 */

/**
 * @todo trim down swiper if possible, do not import everything like it is now
 */

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

// modular approach
// import Swiper from 'swiper';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
// import 'swiper/scss/autoplay';

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', domReady );
} else {
	domReady();
}

// TODO: add possibility to parse thumbnail slider settings in slider (e.g. thumbs: property on the same level as config)

// function initializeThumbnails( el ) {
// 	const swiper = document.createElement( 'div' );
// 	swiper.classList.add( 'swiper' );
// 	const swiperWrapper = document.createElement( 'div' );
// 	swiperWrapper.classList.add( 'swiper-wrapper' );
// 	swiper.appendChild( swiperWrapper );
// 	el.insertAdjacentElement( 'afterend', swiper );

// 	return new Swiper( swiper, {
// 		loop: true,
// 		spaceBetween: 10,
// 		slidesPerView: 4,
// 		freeMode: true,
// 		watchSlidesProgress: true,
// 	} );
// }

function domReady() {
	const swiperInstances = document.querySelectorAll( '.swiper' );
	if ( swiperInstances ) {
		swiperInstances.forEach( function ( el ) {
			const parsedSettings = JSON.parse( el.dataset.settings );
			const modules = [];
			// if ( parsedSettings.pagination ) {
			// 	modules.push( Pagination );
			// }
			// if ( parsedSettings.navigation ) {
			// 	modules.push( Navigation );
			// }
			// if ( parsedSettings.autoplay ) {
			// 	modules.push( Autoplay );
			// }

			// TODO for thumbs
			// if ( parsedSettings?.thumbs?.swiper ) {
			// 	parsedSettings.thumbs.swiper = initializeThumbnails( el );
			// }

			const settings = { ...parsedSettings, modules };
			new Swiper( el, settings );
		} );
	}
}
