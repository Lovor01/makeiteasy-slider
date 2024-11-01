import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextareaControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

const SliderSidebar = ( { attributes, setAttributes } ) => {
	const handleSliderLayoutChange = ( value ) => {
		const intValue = parseInt( value );
		if ( intValue && intValue !== attributes.sliderLayout ) {
			setAttributes( { sliderLayout: intValue } );
		}
	};
	return (
		<InspectorControls group="settings">
			<PanelBody
				title={ __( 'Display', 'makeiteasy-slider' ) }
				initialOpen={ true }
			>
				<PanelRow>
					<RadioControl
						label={ __( 'Slider display' ) }
						help="Slider appearance for easier management."
						selected={ attributes.sliderLayout.toString() }
						options={ [
							{ label: 'full horizontal', value: '1' },
							{
								label: 'two slides horizontal',
								value: '2',
							},
							{ label: 'vertical', value: '3' },
						] }
						onChange={ handleSliderLayoutChange }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __( 'Settings', 'makeiteasy-slider' ) }>
				<PanelRow>
					<ToggleControl
						label={ __( 'Show Navigation', 'makeiteasy-slider' ) }
						checked={ attributes.showNavigation }
						onChange={ ( showNavigation ) =>
							setAttributes( { showNavigation } )
						}
						disabled={ attributes.useOnlyAdvancedSliderSettings }
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={ __( 'Show Pagination', 'makeiteasy-slider' ) }
						checked={ attributes.showPagination }
						onChange={ ( showPagination ) =>
							setAttributes( { showPagination } )
						}
						disabled={ attributes.useOnlyAdvancedSliderSettings }
					/>
				</PanelRow>
				<PanelRow>
					<UnitControl
						className="mie-time-between-slides"
						label={ __( 'Slide interval', 'makeiteasy-slider' ) }
						value={ attributes.timeBetweenSlides }
						onChange={ ( timeBetweenSlides ) =>
							setAttributes( { timeBetweenSlides } )
						}
						disabled={ attributes.useOnlyAdvancedSliderSettings }
						onUnitChange={ ( unit ) =>
							setAttributes( {
								timeBetweenSlides: (
									parseFloat( attributes.timeBetweenSlides ) *
									( unit === 's' ? 1 / 1000 : 1000 )
								).toPrecision( 3 ),
							} )
						}
						units={ [
							{
								a11yLabel: 'seconds',
								label: 's',
								step: 1,
								value: 's',
								default: 5,
							},
							{
								a11yLabel: 'milliseconds',
								label: 'ms',
								step: 100,
								value: 'ms',
								default: 5000,
							},
						] }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody>
				<PanelRow>
					<ToggleControl
						label={ __(
							'Use only advanced slider settings',
							'makeiteasy-slider'
						) }
						checked={ attributes.useOnlyAdvancedSliderSettings }
						onChange={ ( useOnlyAdvancedSliderSettings ) =>
							setAttributes( { useOnlyAdvancedSliderSettings } )
						}
					/>
				</PanelRow>
			</PanelBody>

			<PanelBody
				title={ __( 'Advanced slider settings', 'makeiteasy-slider' ) }
				initialOpen={ false }
				scrollAfterOpen
			>
				<PanelRow>
					<TextareaControl
						className="mie-advanced-slider-settings-special-help"
						label={ __(
							'Advanced slider settings',
							'makeiteasy-slider'
						) }
						help={
							__(
								'Slider settings as object properties (JSON).',
								'makeiteasy-slider'
							) +
							`\nIf targeting slider default classes, add ${ attributes.sliderId },\ni.e. swiper-button-next-${ attributes.sliderId }.`
						}
						value={ attributes.sliderSettings }
						onChange={ ( sliderSettings ) =>
							setAttributes( { sliderSettings } )
						}
						rows="12"
						style={ { width: '95%' } }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);
};

export default SliderSidebar;