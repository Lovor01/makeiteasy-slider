import {
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import BlockSidebar from './components/BlockSidebar';
import BlockToolbar from './components/BlockToolbar';
import { emptySliderTemplate, slidePlaceholder } from './components/templates';
import cx from '../helpers/cx';
import { useSelect } from '@wordpress/data';

import './editor.scss';

export function Edit( { attributes, setAttributes, clientId } ) {
	const isEmpty = useSelect(
		( select ) => {
			return (
				select( blockEditorStore ).getBlock( clientId ).innerBlocks
					.length === 0
			);
		},
		[ clientId ]
	);
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
							attributes.hideSlide && 'mie-slide-hidden',
							isEmpty && 'mie-slide-has-placeholder'
						),
						style: { width: attributes.slideWidth },
					} ),
					{
						template: emptySliderTemplate,
						placeholder: slidePlaceholder,
						prioritizedInserterBlocks: [
							'core/cover',
							'core/image',
						],
						renderAppender: () =>
							isEmpty ? (
								false
							) : (
								<InnerBlocks.DefaultBlockAppender />
							),
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
