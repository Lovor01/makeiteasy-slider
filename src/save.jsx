/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes: { sliderSettings } } ) {
	let parsedSettings;
	try {
		parsedSettings = JSON.parse( sliderSettings );
	} catch {
		// eslint-disable-next-line no-console
		console.warn( 'Error parsing slider settings' );
		parsedSettings = { pagination: false, navigation: false };
	}
	const hasPagination = Boolean( parsedSettings.pagination );
	const hasNavigation = Boolean( parsedSettings.navigation );

	return (
		<div { ...useBlockProps.save() }>
			<div className="swiper" data-settings={ sliderSettings }>
				<div
					className="swiper-wrapper"
					{ ...useInnerBlocksProps.save() }
				/>
			</div>
			{ hasPagination && <div className="swiper-pagination" /> }
			{ hasNavigation && <div className="swiper-button-prev" /> }
			<div className="swiper-button-next" />
			<script />
		</div>
	);
}
