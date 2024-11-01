// set swiper-slide classes
import { useEffect, useId } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';

// TODO: consider rewriting isMounted to use Ref
let isMounted = true;

export function useInjectClass( clientId ) {
	useEffect( () => {
		const thisBlocks =
			select( 'core/block-editor' ).getBlocksByClientId( clientId );
		const children = Array.isArray( thisBlocks )
			? thisBlocks[ 0 ]?.innerBlocks
			: undefined;
		if ( children ) {
			children.forEach( ( child ) => {
				const classes = select(
					'core/block-editor'
				).getBlockAttributes( child.clientId ).className;
				if (
					classes === undefined ||
					( isMounted && classes?.indexOf( 'swiper-slide' ) === -1 )
				) {
					dispatch( 'core/block-editor' ).updateBlockAttributes(
						child.clientId,
						{
							className:
								classes + classes ? '' : ' ' + 'swiper-slide',
						}
					);
				}
			} );
		}
		return () => {
			isMounted = false;
		};
	} );
}

export function useSliderId( attributes, setAttributes ) {
	// give unique id and save it to attributes
	const sliderId = useId().slice( 1, -1 );
	useEffect( () => {
		if ( ! attributes.sliderId ) {
			setAttributes( { sliderId } );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ attributes.sliderId ] );
}
