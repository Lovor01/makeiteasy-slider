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
	Button,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import Configurations from './BlockSidebar/Configurations';
// import InspectorControlsSliderAdvanced from './BlockSidebar/CustomSideBarPanelFill';

const SliderSidebar = ( { attributes, setAttributes } ) => {
	const handleSliderLayoutChange = ( value ) => {
		const intValue = parseInt( value );
		if ( intValue && intValue !== attributes.sliderLayout ) {
			setAttributes( { sliderLayout: intValue } );
		}
	};
	const { createNotice } = useDispatch( noticesStore );
	const copyJsonToClipboard = async () => {
		let config;
		try {
			await navigator.clipboard.writeText( attributes.sliderSettings );
			config = { status: 'success', text: 'JSON copied to clipboard' };
		} catch ( err ) {
			config = {
				status: 'error',
				text: 'Error copying JSON to clipboard',
			};
		} finally {
			createNotice( config.status, config.text, {
				type: 'snackbar',
				isDismissible: true,
			} );
		}
	};
	return (
		<>
			<InspectorControls group="settings">
				{ /* Editor layout */ }
				<PanelBody
					title={ __( 'Editor layout', 'makeiteasy-slider' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<RadioControl
							label={ __(
								'Editor-only Setting',
								'makeiteasy-slider'
							) }
							help="This control adjusts the block layout in the editor. It does not affect the front-end display."
							selected={ attributes.sliderLayout.toString() }
							options={ [
								{ label: 'one horizontal slide', value: '1' },
								{ label: 'vertical', value: '3' },
								{
									label: 'two slides horizontal',
									value: '2',
								},
							] }
							onChange={ handleSliderLayoutChange }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={ __( 'Presets', 'makeiteasy-slider' ) }>
					<Configurations
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Settings', 'makeiteasy-slider' ) }>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Show Navigation',
								'makeiteasy-slider'
							) }
							checked={ attributes.showNavigation }
							onChange={ ( showNavigation ) =>
								setAttributes( { showNavigation } )
							}
							disabled={
								attributes.useOnlyAdvancedSliderSettings
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Show Pagination',
								'makeiteasy-slider'
							) }
							checked={ attributes.showPagination }
							onChange={ ( showPagination ) =>
								setAttributes( { showPagination } )
							}
							disabled={
								attributes.useOnlyAdvancedSliderSettings
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Show Scrollbar',
								'makeiteasy-slider'
							) }
							checked={ attributes.showScrollbar }
							onChange={ ( showScrollbar ) =>
								setAttributes( { showScrollbar } )
							}
							disabled={
								attributes.useOnlyAdvancedSliderSettings
							}
						/>
					</PanelRow>
					<PanelRow>
						<UnitControl
							className="mie-time-between-slides"
							label={ __(
								'Slide interval',
								'makeiteasy-slider'
							) }
							value={ attributes.timeBetweenSlides }
							onChange={ ( timeBetweenSlides ) =>
								setAttributes( { timeBetweenSlides } )
							}
							disabled={
								attributes.useOnlyAdvancedSliderSettings
							}
							onUnitChange={ ( unit ) =>
								setAttributes( {
									timeBetweenSlides: (
										parseFloat(
											attributes.timeBetweenSlides
										) * ( unit === 's' ? 1 / 1000 : 1000 )
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
								setAttributes( {
									useOnlyAdvancedSliderSettings,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{ /* Advanced controls (JSON) */ }

			<InspectorControls group="settings">
				<PanelBody
					title={ __(
						'Advanced slider settings',
						'makeiteasy-slider'
					) }
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
					<PanelRow>
						<Button
							variant="tertiary"
							size="small"
							onClick={ copyJsonToClipboard }
						>
							Copy JSON
						</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{ /* dimensions */ }

			<InspectorControls group="dimensions">
				<PanelRow>
					<UnitControl
						label={ __( 'Slider height', 'makeiteasy-slider' ) }
						value={ attributes.sliderHeight }
						onChange={ ( sliderHeight ) =>
							setAttributes( { sliderHeight } )
						}
						units={ [
							{
								a11yLabel: 'pixels',
								label: 'px',
								step: 1,
								value: 'px',
								default: 500,
							},
							{
								a11yLabel: 'percent',
								label: '%',
								step: 1,
								value: '%',
								default: 100,
							},
							{
								a11yLabel: 'viewport height',
								label: 'vh',
								step: 1,
								value: 'vh',
								default: 1,
							},
							{
								a11yLabel: 'dynamic viewport height',
								label: 'dvh',
								step: 1,
								value: 'dvh',
								default: 1,
							},
						] }
						placeholder={ __( 'Auto', 'makeiteasy-slider' ) }
					/>
				</PanelRow>
			</InspectorControls>
		</>
	);
};

export default SliderSidebar;
