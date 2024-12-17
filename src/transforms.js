/**
 * This file defines block transforms to other blocks
 */
import { createBlock } from '@wordpress/blocks';

// auxiliary function to handle case when there is only one block - in this case blocks is object
// const blocksToConvert = ( blocks ) =>
// 	Array.isArray( blocks ) ? blocks : [ blocks ];

const everyBlockIsImage = ( blocks ) =>
	removeSlide( blocks ).every( ( block ) => block.name === 'core/image' );

// const flattenArrayOfBlocksToInnerBlocks = ( blocks ) =>
// 	blocks.map( ( block ) => block.innerBlocks ).flat();

const createSlider = ( blocks ) =>
	createBlock(
		'makeiteasy/slider',
		undefined,
		blocks.map( ( block ) =>
			createBlock( 'makeiteasy/slide', undefined, [ block ] )
		)
	);

/**
 * @param {Object[]} innerBlocks
 * @return {Array[]} - array of innerBlocks (array) without slides
 */
const removeSlide = ( innerBlocks ) =>
	innerBlocks.flatMap( ( slide ) => slide.innerBlocks );

export default {
	from: [
		{
			type: 'block',
			blocks: [ '*' ],
			transform( undefined, innerBlocksArray ) {
				// innerBlocksArray is array of arrays of innerBlocks
				return createSlider( innerBlocksArray.flat() );
			},
			//  exclude slider and gallery from all blocks
			isMatch( _, blocks ) {
				return ! blocks.some( ( block ) =>
					[ 'makeiteasy/slider', 'makeiteasy/slide' ].includes(
						block.name
					)
				);
			},
			isMultiBlock: true,
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			transform( undefined, innerBlocks ) {
				return createBlock(
					'core/group',
					undefined,
					removeSlide( innerBlocks )
				);
			},
			priority: 9,
		},
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			transform( undefined, innerBlocks ) {
				return createBlock(
					'core/gallery',
					undefined,
					removeSlide( innerBlocks )
				);
			},
			isMatch( undefined, { innerBlocks = undefined } ) {
				if ( ! innerBlocks ) {
					return false;
				}
				return everyBlockIsImage( innerBlocks );
			},
			priority: 9,
		},
	],
	// ungroup: ( attributes, innerBlocks ) => innerBlocks,
};
