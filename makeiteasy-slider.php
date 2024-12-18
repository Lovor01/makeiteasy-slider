<?php
/**
 *
 * @package           makeiteasysliderswiper
 * @author            Lovro Hrust
 * @copyright         Lovro Hrust
 *
 * Plugin Name:       MakeITeasy slider
 * Description:       Block slider based on Swiper library
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Author:            Lovro Hrust
 * Author URI:        https://lovrohrust.com.hr
 * License:           LGPLv3
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
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

/**
 * register modules
 */
// register swiper module
// wp_enqueue_script_module(
//  'makeiteasy/swiper',
//  plugins_url( 'build/swiper/swiper-bundle.min.js', __FILE__ ),
//  [],
//  '1.0.0'
// );

function makeiteasy_swiper_slider_block_init() {
	\register_block_type( __DIR__ . '/build' );
	\register_block_type( __DIR__ . '/build/slide' );
	\wp_set_script_translations( 'makeiteasy-slider-editor-script', 'makeiteasy-slider', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'Makeiteasy\Slider\makeiteasy_swiper_slider_block_init' );
