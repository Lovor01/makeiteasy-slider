import { registerBlockType } from '@wordpress/blocks';

import { Edit as edit, Save as save } from './edit_save.jsx';

// end of namespace

const settings = {
	// prettier-ignore
	icon: <svg enableBackground="new 0 0 218.207 218.207" version="1.1" viewBox="0 0 218.2 163.7" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m214.3 0h-210.4c-2.154 0-3.897 1.743-3.897 3.896v155.9c0 2.154 1.743 3.897 3.897 3.897h210.4c2.154 0 3.897-1.743 3.897-3.897v-155.9c0-2.153-1.743-3.896-3.897-3.896zm-206.5 35.07h35.07v70.14h-35.07zm202.6 70.14h-11.69v-70.14h11.69zm0-77.93h-15.59c-2.154 0-3.897 1.743-3.897 3.897v77.93c0 2.154 1.743 3.897 3.897 3.897h15.59v42.86h-202.6v-42.86h38.97c2.154 0 3.897-1.743 3.897-3.897v-77.93c0-2.154-1.743-3.897-3.897-3.897h-38.97v-19.48h202.6z" /><circle cx="113" cy="136.4" r="7.793" /><path d="m66.24 113h109.1c2.154 0 3.897-1.743 3.897-3.897v-77.93c0-2.153-1.743-3.896-3.896-3.896h-109.1c-2.154 0-3.897 1.743-3.897 3.897v77.93c0 2.154 1.743 3.897 3.897 3.897zm3.897-77.93h101.3v70.14h-101.3z" /><rect x="66.24" y="132.5" width="11.69" height="7.793" /><rect x="85.72" y="132.5" width="11.69" height="7.793" /><rect x="128.6" y="132.5" width="11.69" height="7.793" /><rect x="148.1" y="132.5" width="11.69" height="7.793" /></svg>,

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
