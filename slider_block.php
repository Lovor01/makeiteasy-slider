<?php
/**
 *
 * @package         blocksliderswiper
 * @author 	        Lovro Hrust
 * @copyright 2022  Lovro Hrust
 *
 * Plugin Name:     Block slider swiper
 * Description:     Block slider based on swiper
 * Version:         1.0.0
 * Requires at least: 5.6
 * Requires PHP:    7.4
 * Author:          Lovro Hrust
 * Author URI:      https://lovrohrust.com.hr
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     mie_block_slider
 *
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

require 'attribute-extensions.php';

function makeiteasy_swiper_slider_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "makeiteasy/swiper splider" block first.'
		);
	}

	register_block_type( $dir . '/build');


}
add_action( 'init', 'makeiteasy_swiper_slider_block_init' );
