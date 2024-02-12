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
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	TextareaControl,
	RadioControl,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	let isMounted = true;

	// render this if slider is empty
	const isEmpty = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockCount( clientId ) === 0
	);
	const EmptyPlaceholder = () => {
		if ( isEmpty )
			return (
				<div className="empty-placeholder">
					{
						__(
							'Slider is empty. Add blocks by clicking on "plus".'
						) /*Slider je prazan. Dodajte blokove klikom na "plus".*/
					}
				</div>
			);
		else return null;
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
		if ( isEmpty ) classToReturn += ' empty-container';
		return classToReturn;
	};

	// set swiper-slide classes

	const injectClass = () => {
		const thisBlocks =
			select( 'core/block-editor' ).getBlocksByClientId( clientId );
		const children = Array.isArray( thisBlocks )
			? thisBlocks[ 0 ]?.innerBlocks
			: [];
		children.forEach( ( child ) => {
			const classes = select( 'core/block-editor' ).getBlockAttributes(
				child.clientId
			).className;
			if (
				classes === undefined ||
				( isMounted && classes?.indexOf( 'swiper-slide' ) === -1 )
			)
				dispatch( 'core/block-editor' ).updateBlockAttributes(
					child.clientId,
					{
						className:
							classes + classes ? '' : ' ' + 'swiper-slide',
					}
				);
		} );
	};

	useEffect( () => {
		injectClass();
		return () => {
			isMounted = false;
		};
	} );

	const emptySliderTemplate = applyFilters(
		'makeiteasy-slider-newSlideTemplate',
		[
			[
				'core/cover',
				{
					dimRatio: 60,
					overlayColor: 'dark-blue',
					className:
						'has-background-dim-60 has-dark-blue-background-color swiper-slide',
					url: 'https://makeiteasy.hr/altius/extra/slajder_placeholder.png',
				},
				[
					[ 'core/heading', { placeholder: __( 'Slide Title...' ) } ],
					[
						'core/paragraph',
						{ placeholder: __( 'Slide Text...' ) },
					],
				],
			],
		]
	);

	// deconstruct useInnerBlocksProps to insert elements on same level
	const { children: innerBlocksChildren, ...onlyInnerBlocksProps } =
		useInnerBlocksProps( useBlockProps( { className: getClasses() } ), {
			renderAppender: InnerBlocks.ButtonBlockAppender,
			orientation:
				attributes.sliderLayout == 3 ? 'vertical' : 'horizontal',
			template: emptySliderTemplate,
		} );

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Slider settings" //Postavke slajdera
						initialOpen={ true }
						opened={ true }
					>
						<PanelRow>
							<RadioControl
								label={ __( 'Slider display' ) } // Slider prikaz
								help="The way slider will look for easier content entry" // Način kako će izgledati slajder radi lakšeg unošenja.
								selected={ attributes.sliderLayout }
								options={ [
									{ label: 'full horizontal', value: 1 }, // puni horizontalni
									{
										label: 'reduced horizontal', //smanjeni horizontalni
										value: 2,
									},
									{ label: 'vertical', value: 3 }, // vertikalni
								] }
								onChange={ ( value ) =>
									value &&
									value !== attributes.sliderLayout &&
									setAttributes( {
										sliderLayout: parseInt( value ),
									} )
								}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						title="Advanced slider settings" // Napredne postavke slajdera
						initialOpen={ false }
					>
						<PanelRow>
							<TextareaControl
								label="Advanced slider settings" // Napredne postavke slajdera
								help="Slider settings as object properties (JSON)" // Postavke slidera u formatu object properties-a
								value={ attributes.sliderSettings }
								onChange={ ( sliderSettings ) =>
									setAttributes( { sliderSettings } )
								}
								rows="12"
								style={ { width: '95%' } }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...onlyInnerBlocksProps }>
				{ innerBlocksChildren }
				<EmptyPlaceholder />
			</div>
		</>
	);
}
