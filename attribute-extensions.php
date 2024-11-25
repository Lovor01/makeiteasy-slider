<?php
/**
 * !!!
 * Deprecated
 */
/**
 * Add attributes through filter
 * This could be done in javascript as well with appropriate filter
 */

namespace makeiteasy;

function filter_metadata_registration( $metadata ) {
	if ( $metadata['category'] !== 'theme' ) {
		$metadata['attributes']['hideMIESliderSlide'] = [
			'type'    => 'boolean',
			'default' => null,
		];
	}

	return $metadata;
}

add_filter( 'block_type_metadata', 'makeiteasy\filter_metadata_registration' );


/**
 * Do not render block if attribute hideMIESliderSlide is true
 */
function filter_render_block( $block_content, $block ) {
	if ( ! empty( $block['attrs']['hideMIESliderSlide'] ) ) {
		return '';
	}

	return $block_content;
}
add_filter( 'render_block', 'makeiteasy\filter_render_block', 10, 2 );