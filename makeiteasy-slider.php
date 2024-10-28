<?php
/**
 *
 * @package           blocksliderswiper
 * @author            Lovro Hrust
 * @copyright 2022    Lovro Hrust
 *
 * Plugin Name:       Makeiteasy slider swiper
 * Description:       Block slider based on swiper
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
// wp_register_script_module( 'makeiteasy/swiper/modules', plugin_dir_url( __FILE__ ) . 'node_modules/swiper/modules/index.min.mjs' );
// wp_enqueue_script_module( 'makeiteasy/swiper', plugin_dir_url( __FILE__ ) . 'node_modules/swiper/swiper.min.mjs', [ 'makeiteasy/swiper/modules' ] );

function makeiteasy_swiper_slider_block_init() {
	\register_block_type( __DIR__ . '/build' );
	\wp_set_script_translations( 'makeiteasy-slider-editor-script', 'makeiteasy-slider', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'Makeiteasy\Slider\makeiteasy_swiper_slider_block_init' );
