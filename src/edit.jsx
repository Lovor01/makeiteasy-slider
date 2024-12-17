import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useSliderId } from './helpers/hooks';
import SliderSidebar from './components/BlockSidebar';
import EmptyPlaceholder from './components/EmptyPlaceholder';
import cx from './helpers/cx';
import { useRef } from '@wordpress/element';

import './editor.scss';

export default function Edit( {
	attributes,
	attributes: { sliderLayout, sliderHeight, spaceBetween, align = undefined },
	setAttributes,
	clientId,
} ) {
	const sliderRef = useRef( null );

	// if block has more than one parent or parent block is not group block and full width, restrict block size
	const blockParents = useSelect( ( select ) =>
		select( blockEditorStore ).getBlockParents( clientId )
	);
	const firstParent = useSelect(
		( select ) => {
			if ( blockParents.length === 0 ) {
				return undefined;
			}
			select( blockEditorStore ).getBlock( blockParents[ 0 ] );
		},
		[ blockParents ]
	);

	const addRestrictingClass =
		align !== undefined ||
		( blockParents.length !== 0 &&
			( blockParents.length > 1 ||
				( firstParent &&
					( firstParent.name !== 'core/group' ||
						firstParent.attributes.align === 'full' ) &&
					sliderLayout !== 3 ) ) );

	// test if slider is empty
	const isEmpty = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockCount( clientId ) === 0
	);

	// give unique id and save it to attributes
	useSliderId( attributes, setAttributes );

	// Give appropriate class according to slider orientation
	/**
	 * sliderLayout:
	 * 1 - horizontal
	 * 2 - horizontal 50% width
	 * 3 - vertical
	 */
	const getClasses = () => {
		let classToReturn = '';
		switch ( sliderLayout ) {
			case 1:
				classToReturn = 'mie-show-horizontal';
				break;
			case 2:
				classToReturn = 'mie-show-horizontal50';
				break;
			case 3:
				classToReturn = 'mie-show-vertical';
				break;
		}
		if ( isEmpty ) {
			classToReturn += ' empty-container';
		}
		return cx(
			classToReturn,
			sliderHeight && 'mie-slider-has-fixed-height',
			addRestrictingClass && 'mie-slider-restrict-width'
		);
	};

	// add classes to inner blocks
	// useInjectClass( clientId );

	// deconstruct useInnerBlocksProps to insert elements on same level
	const isVertical = sliderLayout === 3;
	const { children: innerBlocksChildren, ...restBlockProps } =
		useInnerBlocksProps(
			useBlockProps( { className: getClasses(), ref: sliderRef } ),
			{
				// do not show appender if horizontal, it will be shown outside of block
				renderAppender: isVertical
					? InnerBlocks.ButtonBlockAppender
					: false,
				orientation: isVertical ? 'vertical' : 'horizontal',
				defaultBlock: { name: 'makeiteasy/slide', attributes: {} },
				template: [ [ 'makeiteasy/slide', {} ] ],
				directInsert: true,
				allowedBlocks: [ 'makeiteasy/slide' ],
				placeholder: <EmptyPlaceholder />,
			}
		);

	// do not set height if slider is vertical
	if ( sliderLayout !== 3 ) {
		restBlockProps.style = {
			...restBlockProps.style,
			height: sliderHeight,
		};
	}

	return (
		<>
			<SliderSidebar
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...restBlockProps }>
				<div
					className="mie-slider-inner"
					style={ { columnGap: spaceBetween } }
				>
					{ innerBlocksChildren }
				</div>
				{
					/* Add external appender only in horizontal edit mode */
					! isVertical && (
						<div
							className="slider-external-appender wp-block"
							tabIndex="-1"
						>
							{ align === 'full' ? (
								<InnerBlocks.DefaultBlockAppender />
							) : (
								<InnerBlocks.ButtonBlockAppender />
							) }
						</div>
					)
				}
			</div>
		</>
	);
}
