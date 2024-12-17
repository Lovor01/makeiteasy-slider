import { Placeholder } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Empty template, filterable
 *
 * @example
 * [
 *		[
 *			'core/cover',
 *			{
 *				dimRatio: 60,
 *			},
 *			[
 *				[ 'core/heading', { placeholder: __( 'Slide Title…' ) } ],
 *				[ 'core/paragraph', { placeholder: __( 'Slide Text…' ) } ],
 *			],
 *		],
 *	]
 */
export const emptySliderTemplate = applyFilters(
	'makeiteasy-slider-newSlideTemplate',
	undefined
);

export const slidePlaceholder = (
	<Placeholder className="mie-slide-placeholder">
		<div>
			{ __(
				'This is a slide block inside slider block.',
				'makeiteasy-slider'
			) }
			<br />
			{ __( 'Insert a cover or image', 'makeiteasy-slider' ) }
			<br />
			{ __( 'or any other block to start.', 'makeiteasy-slider' ) }
		</div>
		<InnerBlocks.ButtonBlockAppender />
	</Placeholder>
);
