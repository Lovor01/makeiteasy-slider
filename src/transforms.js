/**
 * This file defines block transforms to other blocks
 */
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

// auxiliary function to handle case when there is only one block - in this case blocks is object
const blocksToConvert = ( blocks ) =>
	Array.isArray( blocks ) ? blocks : [ blocks ];

const everyBlockIsImage = ( blocks ) =>
	blocks.every( ( block ) => block.name === 'core/image' );

export default {
	from: [
		{
			type: 'block',
			blocks: [ '*' ],
			__experimentalConvert( blocks ) {
				return createBlock(
					'makeiteasy/slider',
					undefined,
					createBlocksFromInnerBlocksTemplate(
						blocksToConvert( blocks )
					)
				);
			},
			//  exclude slider and gallery from all blocks
			isMatch( _, blocks ) {
				return ! blocks.some( ( block ) =>
					[ 'makeiteasy/slider', 'core/gallery' ].includes(
						block.name
					)
				);
			},
			isMultiBlock: true,
		},
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			__experimentalConvert( block ) {
				return createBlock(
					'makeiteasy/slider',
					undefined,
					createBlocksFromInnerBlocksTemplate(
						blocksToConvert( block.innerBlocks )
					)
				);
			},
			isMultiBlock: false,
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/group' ],
			__experimentalConvert( block ) {
				return createBlock(
					'core/group',
					undefined,
					createBlocksFromInnerBlocksTemplate(
						blocksToConvert( block.innerBlocks )
					)
				);
			},
			isMatch( _, block ) {
				return ! everyBlockIsImage( block.innerBlocks );
			},
			priority: 9,
		},
		{
			type: 'block',
			blocks: [ 'core/gallery' ],
			__experimentalConvert( block ) {
				return createBlock(
					'core/gallery',
					undefined,
					createBlocksFromInnerBlocksTemplate(
						blocksToConvert( block.innerBlocks )
					)
				);
			},
			isMatch( _, block ) {
				return everyBlockIsImage( block.innerBlocks );
			},
			priority: 9,
		},
	],
	ungroup: ( attributes, innerBlocks ) => innerBlocks,
};
