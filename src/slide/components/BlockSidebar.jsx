import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockEditContext,
} from '@wordpress/block-editor';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

const Sidebar = ( { attributes, setAttributes } ) => {
	const { clientId } = useBlockEditContext();
	const resetWidth = () => {
		setAttributes( { slideWidth: undefined } );
	};
	return (
		<InspectorControls group="dimensions">
			<ToolsPanelItem
				hasValue={ () => Boolean( attributes.slideWidth ) }
				label={ __( 'Width', 'makeiteasy-slider' ) }
				isShownByDefault
				panelId={ clientId }
				onDeselect={ resetWidth }
				resetAllFilter={ resetWidth }
			>
				<UnitControl
					label={ __( 'Slide width', 'makeiteasy-slider' ) }
					value={ attributes.slideWidth }
					onChange={ ( slideWidth ) =>
						setAttributes( { slideWidth } )
					}
					units={ [
						{
							a11yLabel: 'pixels',
							label: 'px',
							step: 1,
							value: 'px',
							default: 700,
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
					placeholder={ __( 'Auto', 'makeiteasy-slider' ) }
					className="mie-slide-width"
				/>
			</ToolsPanelItem>
		</InspectorControls>
	);
};

export default Sidebar;
