import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import BlockSidebar from './components/BlockSidebar';
import { emptySliderTemplate, placeholder } from './components/templates';

import './editor.scss';

const hasMinHeightClass = ( attributes ) =>
	Boolean( attributes?.style?.dimensions?.minHeight )
		? ' mie-slide-has-min-height'
		: '';

export function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes } } />
			<div
				{ ...useInnerBlocksProps(
					useBlockProps( {
						className: `swiper-slide${ hasMinHeightClass(
							attributes
						) }`,
						style: { width: attributes.slideWidth },
					} ),
					{
						template: emptySliderTemplate,
						placeholder,
						// renderAppender: false,
						templateInsertUpdatesSelection: true,
					}
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
					className: `swiper-slide${ hasMinHeightClass(
						attributes
					) }`,
					style: { width: attributes.slideWidth },
				} )
			) }
		/>
	);
}
