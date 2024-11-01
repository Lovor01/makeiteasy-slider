/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const parseTimeInMilliseconds = ( time ) => {
	if ( time?.match( /[a-zA-Z]/g )?.join( '' ) === 's' ) {
		return parseFloat( time ) * 1000;
	}
	return parseFloat( time );
};

export default function Save( {
	attributes: {
		sliderSettings,
		timeBetweenSlides,
		sliderId,
		showNavigation,
		showPagination,
	},
} ) {
	let parsedSettings;
	try {
		parsedSettings = JSON.parse( sliderSettings );
	} catch {
		// eslint-disable-next-line no-console
		console.warn( 'Error parsing slider settings' );
		parsedSettings = { pagination: false, navigation: false };
	}

	const timeBetweenSlidesNumber =
		parseTimeInMilliseconds( timeBetweenSlides );

	// add overriden attributes
	if ( timeBetweenSlidesNumber >= 0 ) {
		parsedSettings.autoplay = {
			...parsedSettings.autoplay,
			delay: timeBetweenSlidesNumber,
		};
	}
	// each slider should have its unique class - therefore addition of sliderId
	if ( showNavigation ) {
		parsedSettings.navigation = {
			...parsedSettings.navigation,
			prevEl: `.swiper-button-prev-${ sliderId }`,
			nextEl: `.swiper-button-next-${ sliderId }`,
		};
	}

	if ( showPagination ) {
		parsedSettings.pagination = {
			...parsedSettings.pagination,
			el: `.swiper-pagination-${ sliderId }`,
			type: 'bullets',
			// clickable: true,
		};
	}

	//  using converted parsedSettings back to JSON helps in managing, but also is a weak security layer - possible javascript is removed

	const hasPagination = Boolean( parsedSettings.pagination );
	const hasNavigation = Boolean( parsedSettings.navigation );

	return (
		<div { ...useBlockProps.save() }>
			<div
				className="swiper"
				data-settings={ JSON.stringify( parsedSettings ) }
			>
				<div
					className="swiper-wrapper"
					{ ...useInnerBlocksProps.save() }
				/>
			</div>
			{ hasPagination && (
				<div
					className={ `swiper-pagination swiper-pagination-${ sliderId }` }
				/>
			) }
			{ hasNavigation && (
				<div
					className={ `swiper-button-prev swiper-button-prev-${ sliderId }` }
				/>
			) }
			{ hasNavigation && (
				<div
					className={ `swiper-button-next swiper-button-next-${ sliderId }` }
				/>
			) }
			<script />
		</div>
	);
}
