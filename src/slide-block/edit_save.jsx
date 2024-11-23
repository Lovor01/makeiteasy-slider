import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

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
const emptySliderTemplate = applyFilters(
	'makeiteasy-slider-newSlideTemplate',
	undefined
);

export function Edit() {
	return (
		<div
			{ ...useInnerBlocksProps(
				...useBlockProps(
					{ className: 'swiper-slide' },
					{ template: emptySliderTemplate }
				)
			) }
		/>
	);
}

export function Save() {
	return (
		<div
			{ ...useInnerBlocksProps.save(
				...useBlockProps.save( { className: 'swiper-slide' } )
			) }
		/>
	);
}
