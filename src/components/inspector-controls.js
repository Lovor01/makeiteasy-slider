import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	PanelRow,
	RadioControl,
	TextareaControl,
} from '@wordpress/components';

const SliderSidebar = ( { attributes, setAttributes } ) => {
	const handleSliderLayoutChange = ( value ) => {
		const intValue = parseInt( value );
		if ( intValue && intValue !== attributes.sliderLayout ) {
			setAttributes( { sliderLayout: intValue } );
		}
	};
	return (
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
							selected={ attributes.sliderLayout.toString() }
							options={ [
								{ label: 'full horizontal', value: '1' }, // puni horizontalni
								{
									label: 'reduced horizontal', //smanjeni horizontalni
									value: '2',
								},
								{ label: 'vertical', value: '3' }, // vertikalni
							] }
							onChange={ handleSliderLayoutChange }
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
	);
};

export default SliderSidebar;
