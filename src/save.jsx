/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save ( { attributes: { sliderSettings } } ) {
	let parsedSettings;
	try {
		parsedSettings = JSON.parse( sliderSettings );
	} catch {
		console.warn( 'Error parsing slider settings' );
		parsedSettings={pagination: false, navigation: false}
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
			{ hasNavigation && <div className="swiper-button-next" /> }
			<script />
		</div>
	);
}
