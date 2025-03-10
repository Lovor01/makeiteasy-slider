/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( { attributes } ) {
	const { sliderSettings } = attributes;

	return (
		<div
			{ ...useBlockProps.save( {
				className: 'swiper',
				'data-settings': sliderSettings,
			} ) }
		>
			<div className="swiper-wrapper">
				<InnerBlocks.Content />
				{ /* <RawHTML>{ html }</RawHTML> */ }
			</div>
			<div className="swiper-pagination"></div>
			<div className="swiper-button-prev"></div>
			<div className="swiper-button-next"></div>
			<script></script>
		</div>
	);
}
