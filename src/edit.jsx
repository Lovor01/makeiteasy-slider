import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useInjectClass, useSliderId } from './helpers/hooks';
import SliderSidebar from './components/BlockSidebar';
import EmptyPlaceholder, {
	emptySliderTemplate,
} from './components/EmptyPlaceholder';

import './editor.scss';

export default function Edit( {
	attributes,
	attributes: { sliderLayout },
	setAttributes,
	clientId,
} ) {
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
		return classToReturn;
	};

	// add classes to inner blocks
	useInjectClass( clientId );

	// deconstruct useInnerBlocksProps to insert elements on same level
	const isVertical = sliderLayout === 3;
	const { children: innerBlocksChildren, ...onlyInnerBlocksProps } =
		useInnerBlocksProps( useBlockProps( { className: getClasses() } ), {
			// do not show appender if horizontal, it will be shown outside of block
			renderAppender: isVertical
				? InnerBlocks.ButtonBlockAppender
				: false,
			orientation: isVertical ? 'vertical' : 'horizontal',
			template: emptySliderTemplate,
		} );

	return (
		<>
			<SliderSidebar
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...onlyInnerBlocksProps }>
				<div className="mie-slider-inner">
					{ innerBlocksChildren }
					{ isEmpty && (
						<EmptyPlaceholder
							innerBlocksChildren={ innerBlocksChildren }
						/>
					) }
				</div>
				{ /* Add external appender */ }
				<div
					className="slider-external-appender wp-block"
					tabIndex="-1"
				>
					<InnerBlocks.ButtonBlockAppender />
				</div>
			</div>
		</>
	);
}
