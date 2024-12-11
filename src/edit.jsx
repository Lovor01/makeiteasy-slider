import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useSliderId } from './helpers/hooks';
import SliderSidebar from './components/BlockSidebar';
import EmptyPlaceholder from './components/EmptyPlaceholder';
import cx from './helpers/cx';
import WelcomeGuide, { init } from './nux/tips';

import './editor.scss';

// initialize default for welcome preference if it does not exist
init();

export default function Edit( {
	attributes,
	attributes: { sliderLayout, sliderHeight },
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
	// useInjectClass( clientId );

	// deconstruct useInnerBlocksProps to insert elements on same level
	const isVertical = sliderLayout === 3;
	const { children: innerBlocksChildren, ...restBlocksProps } =
		useInnerBlocksProps( useBlockProps( { className: getClasses() } ), {
			// do not show appender if horizontal, it will be shown outside of block
			renderAppender: isVertical
				? InnerBlocks.ButtonBlockAppender
				: false,
			orientation: isVertical ? 'vertical' : 'horizontal',
			defaultBlock: { name: 'makeiteasy/slide', attributes: {} },
			directInsert: true,
			allowedBlocks: [ 'makeiteasy/slide' ],
			placeholder: <EmptyPlaceholder />,
		} );

	// do not set height if slider is vertical
	if ( sliderLayout !== 3 ) {
		restBlocksProps.style = {
			...restBlocksProps.style,
			height: sliderHeight,
		};
	}
	if ( sliderHeight ) {
		restBlocksProps.className = cx(
			restBlocksProps.className,
			'mie-slider-has-fixed-height'
		);
	}

	return (
		<>
			<SliderSidebar
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<WelcomeGuide />
			<div { ...restBlocksProps }>
				<div className="mie-slider-inner">{ innerBlocksChildren }</div>
				{
					/* Add external appender only in horizontal edit mode */
					! isVertical && (
						<div
							className="slider-external-appender wp-block"
							tabIndex="-1"
						>
							{ attributes.align === 'full' ? (
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
