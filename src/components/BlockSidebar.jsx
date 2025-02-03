import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextareaControl,
	TextControl,
	ToggleControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
	Button,
	ExternalLink,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import Configurations from './BlockSidebar/Configurations';
import WelcomeGuide, { init, showGuideNow } from '../nux/tips';
import { useState, useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';

// initialize default for welcome preference if it does not exist
init();

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
			config = { status: 'success', text: 'JSON copied to clipboard!' };
		} catch ( err ) {
			config = {
				status: 'error',
				text: 'Error copying JSON to clipboard!',
			};
		} finally {
			createNotice( config.status, config.text, {
				type: 'snackbar',
				isDismissible: true,
			} );
		}
	};
	const pasteJsonFromClipboard = async () => {
		let config;
		try {
			const text = await navigator.clipboard.readText();
			setAttributes( { sliderSettings: text } );
			config = { status: 'success', text: 'JSON pasted!' };
		} catch ( err ) {
			config = {
				status: 'error',
				text: 'Error pasting JSON from clipboard!',
			};
		} finally {
			createNotice( config.status, config.text, {
				type: 'snackbar',
				isDismissible: true,
			} );
		}
	};

	const [ isJSONError, setJSONError ] = useState( false );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedValidateSettings = useCallback(
		useDebounce( ( sliderSettings ) => {
			try {
				JSON.parse( sliderSettings );
				setJSONError( false );
			} catch ( error ) {
				setJSONError( true );
			}
		}, 350 ),
		[]
	);
	const validateAndSetSliderSettings = ( sliderSettings ) => {
		setAttributes( { sliderSettings } );
		debouncedValidateSettings( sliderSettings );
	};

	return (
		<>
			<InspectorControls group="settings">
				<WelcomeGuide />

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
								{ label: 'horizontal slide(s)', value: '1' },
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
					<PanelRow>
						<TextControl
							className="mie-slides-per-view"
							label={ __(
								'Slides per view',
								'makeiteasy-slider'
							) }
							type="text"
							value={ attributes.slidesPerView }
							onChange={ ( slidesPerView ) =>
								setAttributes( { slidesPerView } )
							}
							disabled={
								attributes.useOnlyAdvancedSliderSettings
							}
							help={ __(
								'Number or "auto"',
								'makeiteasy-slider'
							) }
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
					<PanelRow className="mie-json-settings">
						<TextareaControl
							className={ `mie-advanced-slider-settings-special-help${
								isJSONError ? ' mie-JSON-error' : ''
							}` }
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
							onChange={ ( sliderSettings ) => {
								validateAndSetSliderSettings( sliderSettings );
							} }
							rows="12"
						/>
						{ isJSONError && (
							<div className="mie-JSON-error-message">
								{ __( 'Invalid JSON.', 'makeiteasy-slider' ) }
							</div>
						) }
					</PanelRow>
					<PanelRow>
						<Button
							variant="tertiary"
							size="small"
							onClick={ copyJsonToClipboard }
						>
							Copy JSON
						</Button>
						<Button
							variant="tertiary"
							size="small"
							onClick={ pasteJsonFromClipboard }
						>
							Paste JSON
						</Button>
					</PanelRow>
					<PanelRow className="mie-helpful-links">
						<p>
							Check the{ ' ' }
							<span>
								<ExternalLink href="https://swiperjs.com/swiper-api#parameters">
									Swiper manual
								</ExternalLink>
							</span>{ ' ' }
							for JSON settings.
						</p>
						<p>
							<ExternalLink href="https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/">
								JSON how to
							</ExternalLink>
						</p>
					</PanelRow>
				</PanelBody>
				<div className="mie-welcome-guide-button-container">
					<Button
						variant="primary"
						className="mie-welcome-guide-button"
						size="small"
						onClick={ showGuideNow }
					>
						Welcome Guide
					</Button>
				</div>
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
				<PanelRow>
					<UnitControl
						className="mie-space-between-slides"
						label={ __( 'Slide spacing', 'makeiteasy-slider' ) }
						value={ attributes.spaceBetween.toString() }
						onChange={ ( spaceBetween ) =>
							setAttributes( {
								spaceBetween: parseFloat( spaceBetween ),
							} )
						}
						units={ [
							{
								a11yLabel: 'pixels',
								label: 'PX',
								step: 1,
								value: 'px',
								default: 15,
							},
						] }
						placeholder={ __( '0', 'makeiteasy-slider' ) }
						size={ 5 }
					/>
				</PanelRow>
				<PanelRow>
					<UnitControl
						label={ __( 'Arrows from edge', 'makeiteasy-slider' ) }
						help={ __(
							'Negative values push arrows outside the slider.',
							'makeiteasy-slider'
						) }
						value={ attributes.arrowsFromEdge }
						onChange={ ( arrowsFromEdge ) =>
							setAttributes( { arrowsFromEdge } )
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
								a11yLabel: 'viewport width',
								label: 'vw',
								step: 1,
								value: 'vw',
								default: 1,
							},
							{
								a11yLabel: 'dynamic viewport width',
								label: 'dvw',
								step: 1,
								value: 'dvw',
								default: 1,
							},
						] }
						placeholder="10px"
					/>
				</PanelRow>
			</InspectorControls>
		</>
	);
};

export default SliderSidebar;
