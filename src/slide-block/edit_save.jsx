import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import BlockSidebar from './components/BlockSidebar';

import './editor.scss';

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

export function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes } } />
			<div
				{ ...useInnerBlocksProps(
					useBlockProps(
						{
							className: 'swiper-slide',
							style: { width: attributes.slideWidth },
						},
						{ template: emptySliderTemplate }
					)
				) }
			/>
		</>
	);
}

export function Save( { attributes } ) {
	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( {
					className: 'swiper-slide',
					style: { width: attributes.slideWidth },
				} )
			) }
		/>
	);
}
