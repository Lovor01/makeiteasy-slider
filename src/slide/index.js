import { registerBlockType } from '@wordpress/blocks';

import { Edit as edit, Save as save } from './edit_save.jsx';

import './style.scss';

// end of namespace

const settings = {
	// prettier-ignore
	/**
	 * @see ./edit.js
	 */
	edit,

	/**
	 * @see ./save.js
	 */
	save,
};

/**
 * Every block starts by registering a new block type definition.
 *
 * Block featured image!
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'makeiteasy/slide', settings );
