<?php
/**
 *
 * @package           makeiteasysliderswiper
 * @author            Lovro Hrust
 * @copyright         Lovro Hrust
 *
 * Plugin Name:       Makeiteasy Slider
 * Description:       Block slider based on Swiper library
 * Version:           1.0.3
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Author:            Lovro Hrust
 * License:           LGPLv3
 * License URI:       https://www.gnu.org/licenses/lgpl-3.0.html
 * Text Domain:       makeiteasy-slider
 *
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

namespace Makeiteasy\Slider;


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

function makeiteasy_swiper_slider_block_init() {
	\register_block_type( __DIR__ . '/build' );
	\register_block_type( __DIR__ . '/build/slide' );
	\wp_set_script_translations( 'makeiteasy-slider-editor-script', 'makeiteasy-slider', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'Makeiteasy\Slider\makeiteasy_swiper_slider_block_init' );