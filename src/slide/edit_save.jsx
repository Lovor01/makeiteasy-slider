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
import { useMemo } from '@wordpress/element';

import './editor.scss';

export function Edit( { attributes, setAttributes, clientId, context } ) {
	const isEmpty = useSelect(
		( select ) => {
			return (
				select( blockEditorStore ).getBlock( clientId ).innerBlocks
					.length === 0
			);
		},
		[ clientId ]
	);
	const sliderSettings = context[ 'makeiteasy-slider/sliderSettings' ];
	const slidesPerViewFromJSON = useMemo( () => {
		try {
			return JSON.parse( sliderSettings ).slidesPerView;
		} catch ( e ) {
			return undefined;
		}
	}, [ sliderSettings ] );
	const slidesPerView = parseInt(
		( ! context[ 'makeiteasy-slider/useOnlyAdvancedSliderSettings' ] &&
			context[ 'makeiteasy-slider/slidesPerView' ] ) ||
			slidesPerViewFromJSON
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
						style: {
							width:
								attributes.slideWidth ||
								100 / slidesPerView + '%',
						},
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
