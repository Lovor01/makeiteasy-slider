/* eslint-disable @wordpress/no-unsafe-wp-apis */
/**
 * WordPress dependencies
 */
import {
	__experimentalStyleProvider as StyleProvider,
	__experimentalToolsPanelContext as ToolsPanelContext,
} from '@wordpress/components';
import warning from '@wordpress/warning';
import { useEffect, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	useBlockEditContext,
	mayDisplayControlsKey,
} from '@wordpress/block-editor';
import groups from './groups';

export default function InspectorControlsFill( {
	children,
	group = 'default',
	resetAllFilter,
} ) {
	const context = useBlockEditContext();
	const Fill = groups[ group ]?.Fill;
	if ( ! Fill ) {
		warning( `Unknown InspectorControls group "${ group }" provided.` );
		return null;
	}
	if ( ! context[ mayDisplayControlsKey ] ) {
		return null;
	}

	return (
		<StyleProvider document={ document }>
			<Fill>
				{ ( fillProps ) => {
					return (
						<ToolsPanelInspectorControl
							fillProps={ fillProps }
							children={ children }
							resetAllFilter={ resetAllFilter }
						/>
					);
				} }
			</Fill>
		</StyleProvider>
	);
}

function RegisterResetAll( { resetAllFilter, children } ) {
	const { registerResetAllFilter, deregisterResetAllFilter } =
		useContext( ToolsPanelContext );
	useEffect( () => {
		if (
			resetAllFilter &&
			registerResetAllFilter &&
			deregisterResetAllFilter
		) {
			registerResetAllFilter( resetAllFilter );
			return () => {
				deregisterResetAllFilter( resetAllFilter );
			};
		}
	}, [ resetAllFilter, registerResetAllFilter, deregisterResetAllFilter ] );
	return children;
}

function ToolsPanelInspectorControl( { children, resetAllFilter, fillProps } ) {
	// `fillProps.forwardedContext` is an array of context provider entries, provided by slot,
	// that should wrap the fill markup.
	const { forwardedContext = [] } = fillProps;

	// Children passed to InspectorControlsFill will not have
	// access to any React Context whose Provider is part of
	// the InspectorControlsSlot tree. So we re-create the
	// Provider in this subtree.
	const innerMarkup = (
		<RegisterResetAll resetAllFilter={ resetAllFilter }>
			{ children }
		</RegisterResetAll>
	);
	return forwardedContext.reduce(
		( inner, [ Provider, props ] ) => (
			<Provider { ...props }>{ inner }</Provider>
		),
		innerMarkup
	);
}
