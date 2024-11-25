import { createHigherOrderComponent } from '@wordpress/compose';
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { ReactComponent as Icon } from '../assets/hide_btn_icon.svg';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const withHideSlideBtn = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const parentIsSlider = useSelect(
			( select ) => {
				const parentID = select( blockEditorStore ).getBlockParents(
					props.clientId,
					true
				)[ 0 ];
				if ( ! parentID ) {
					return false;
				}
				const parentBlock =
					select( blockEditorStore ).getBlock( parentID );
				return parentBlock.name === 'makeiteasy/slider';
			},
			[ props.clientId ]
		);
		return (
			<>
				<BlockControls>
					{ parentIsSlider && (
						<ToolbarGroup>
							<ToolbarButton
								icon={ Icon }
								isPressed={ props.attributes.hideSlide }
								onClick={ () =>
									props.setAttributes( {
										hideSlide: ! props.attributes.hideSlide,
									} )
								}
								showTooltip={ true }
								label={ __(
									'Hide slide',
									'makeiteasy-slider'
								) }
							/>
						</ToolbarGroup>
					) }
				</BlockControls>
				<BlockEdit key="edit" { ...props } />
			</>
		);
	};
}, 'withHideSlideBtn' );

wp.hooks.addFilter( 'editor.BlockEdit', 'makeiteasy/slider', withHideSlideBtn );

/**
 * Add class show-dimmed to block wrapper in editor
 */

const withShowDimmedClassName = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			return (
				<BlockListBlock
					{ ...props }
					className={
						props.attributes?.hideSlide ? 'show-dimmed' : null
					}
				/>
			);
		};
	},
	'withShowDimmedClassName'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'makeiteasy/slider',
	withShowDimmedClassName
);
