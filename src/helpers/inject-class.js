// set swiper-slide classes
import { useEffect } from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';

let isMounted = true;

export default function useInjectClass( clientId ) {
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
