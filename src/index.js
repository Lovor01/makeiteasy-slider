/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
// import { addFilter } from '@wordpress/hooks'

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit.jsx';
import save from './save.jsx';

// deprecations
import save_v0_9 from './deprecated/save_v0_9.jsx';
import settings_v0_9 from './deprecated/settings_v0_9.json';


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

	deprecated: [
		{
			attributes: settings_v0_9.attributes_v0_9,
			supports: settings_v0_9.supports_v0_9,
			save: save_v0_9,
		}
	]
};

/**
 * Every block starts by registering a new block type definition.
 *
 * Block featured image!
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'makeiteasy/slider', settings );

/**
 * add block filter for slider elements for adding class
 */

// function addSwiperClass( props, blockType, attrs ) {
// 	console.debug(props, attrs);
// }

//  addFilter(
// 	'blocks.getSaveContent.extraProps',
// 	'makeiteasy/slider-add-swiper-class',
// 	addSwiperClass
// );
