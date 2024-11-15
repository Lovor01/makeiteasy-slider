import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
// import { Children } from '@wordpress/element';

const parseTimeInMilliseconds = ( time ) => {
	if ( time?.match( /[a-zA-Z]/g )?.join( '' ) === 's' ) {
		return parseFloat( time ) * 1000;
	}
	return parseFloat( time );
};

export default function Save( {
	attributes: {
		sliderSettings,
		timeBetweenSlides,
		sliderId,
		showNavigation,
		showPagination,
	},
} ) {
	let parsedSettings;
	try {
		parsedSettings = JSON.parse( sliderSettings );
	} catch {
		// eslint-disable-next-line no-console
		console.warn( 'Error parsing slider settings' );
		parsedSettings = { pagination: false, navigation: false };
	}

	const timeBetweenSlidesNumber =
		parseTimeInMilliseconds( timeBetweenSlides );

	// add overriden attributes
	if ( timeBetweenSlidesNumber >= 0 ) {
		parsedSettings.autoplay = {
			...parsedSettings.autoplay,
			delay: timeBetweenSlidesNumber,
		};
	}
	// each slider should have its unique class - therefore addition of sliderId
	if ( showNavigation ) {
		parsedSettings.navigation = {
			...parsedSettings.navigation,
			prevEl: `.swiper-button-prev-${ sliderId }`,
			nextEl: `.swiper-button-next-${ sliderId }`,
		};
	}

	if ( showPagination ) {
		parsedSettings.pagination = {
			...parsedSettings.pagination,
			el: `.swiper-pagination-${ sliderId }`,
			type: 'bullets',
			// clickable: true,
		};
	}

	//  using converted parsedSettings back to JSON helps in managing, but also is a weak security layer - possible javascript is removed

	const hasPagination = Boolean( parsedSettings.pagination );
	const hasNavigation = Boolean( parsedSettings.navigation );

	// console.log( innerBlocksProps.children );
	// const innerBlocksProps = structuredClone( innerBlocksProps );
	// const innerHTML = innerBlocksProps.children.props.children;
	// if (
	// 	innerBlocksProps.children.type.name === 'RawHTML' &&
	// 	innerHTML.length > 1
	// ) {
	// 	innerBlocksProps.children.props.children = `<div class="gutu">${ innerHTML }</div>`;
	// }

	// const innerBlocksPropsWrapped = () => {
	// 	const { children, ...rest } = useInnerBlocksProps.save();
	// 	const wrappedChildren = Children.map( children, ( child, index ) => {
	// 		return (
	// 			<div className="swiper-slide" key={ index }>
	// 				{ child }
	// 			</div>
	// 		);
	// 	} );
	// 	return { ...rest, children: wrappedChildren };
	// };

	return (
		<div
			{ ...useBlockProps.save( {
				className: 'swiper',
				'data-settings': JSON.stringify( parsedSettings ),
			} ) }
		>
			<div className="swiper-wrapper" { ...useInnerBlocksProps.save() } />
			{ hasPagination && (
				<div
					className={ `swiper-pagination swiper-pagination-${ sliderId }` }
				/>
			) }
			{ hasNavigation && (
				<div
					className={ `swiper-button-prev swiper-button-prev-${ sliderId }` }
				/>
			) }
			{ hasNavigation && (
				<div
					className={ `swiper-button-next swiper-button-next-${ sliderId }` }
				/>
			) }
		</div>
	);
}
