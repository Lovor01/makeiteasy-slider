import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
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

export const placeholder = (
	<div className="mie-slide-placeholder">
		{ __( 'Insert a block.', 'makeiteasy-slider' ) }
		<br />
		{ __( 'Cover or image blocks are usual choice.', 'makeiteasy-slider' ) }
		<br />
		{ __(
			'Slider works, however, with every block.',
			'makeiteasy-slider'
		) }
		<br />
	</div>
);
