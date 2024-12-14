import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { ReactComponent as Icon } from './images/hide_btn_icon.svg';
import { __ } from '@wordpress/i18n';

const SlideToolbar = ( { attributes: { hideSlide }, setAttributes } ) => {
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ Icon }
						isPressed={ hideSlide }
						onClick={ () =>
							setAttributes( {
								hideSlide: ! hideSlide,
							} )
						}
						showTooltip={ true }
						label={ __( 'Hide slide', 'makeiteasy-slider' ) }
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};

export default SlideToolbar;
