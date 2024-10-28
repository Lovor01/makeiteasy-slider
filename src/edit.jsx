/**
 *  Date-time block edit
 *
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import useInjectClass from './helpers/inject-class';
import SliderSidebar from './components/inspector-controls';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	// render this if slider is empty
	const isEmpty = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockCount( clientId ) === 0
	);
	const EmptyPlaceholder = () => {
		if ( isEmpty ) {
			return (
				<div className="empty-placeholder">
					{
						__(
							'Slider is empty. Add blocks by clicking on "plus".'
						) /*Slider je prazan. Dodajte blokove klikom na "plus".*/
					}
				</div>
			);
		}
		return null;
	};

	// Give appropriate class according to slider orientation
	const getClasses = () => {
		let classToReturn = '';
		switch ( attributes.sliderLayout ) {
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

	const emptySliderTemplate = applyFilters(
		'makeiteasy-slider-newSlideTemplate',
		[
			[
				'core/cover',
				{
					dimRatio: 60,
					className: 'swiper-slide',
				},
				[
					[ 'core/heading', { placeholder: __( 'Slide Title…' ) } ],
					[ 'core/paragraph', { placeholder: __( 'Slide Text…' ) } ],
				],
			],
		]
	);

	// deconstruct useInnerBlocksProps to insert elements on same level
	const { children: innerBlocksChildren, ...onlyInnerBlocksProps } =
		useInnerBlocksProps( useBlockProps( { className: getClasses() } ), {
			renderAppender: InnerBlocks.ButtonBlockAppender,
			orientation:
				attributes.sliderLayout === 3 ? 'vertical' : 'horizontal',
			template: emptySliderTemplate,
		} );

	return (
		<>
			<SliderSidebar
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...onlyInnerBlocksProps }>
				{ innerBlocksChildren }
				<EmptyPlaceholder />
			</div>
		</>
	);
}
