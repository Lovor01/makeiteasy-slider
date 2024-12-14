import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import BlockSidebar from './components/BlockSidebar';
import BlockToolbar from './components/BlockToolbar';
import { emptySliderTemplate, placeholder } from './components/templates';
import cx from '../helpers/cx';

import './editor.scss';

export function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<BlockToolbar { ...{ attributes, setAttributes } } />
			<BlockSidebar { ...{ attributes, setAttributes } } />
			<div
				{ ...useInnerBlocksProps(
					useBlockProps( {
						className: cx(
							'swiper-slide',
							Boolean(
								attributes?.style?.dimensions?.minHeight
							) && 'mie-slide-has-min-height',
							attributes.hideSlide && 'mie-slide-hidden'
						),
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
					className: cx(
						'swiper-slide',
						Boolean( attributes?.style?.dimensions?.minHeight ) &&
							'mie-slide-has-min-height'
					),
					style: { width: attributes.slideWidth },
				} )
			) }
		/>
	);
}
