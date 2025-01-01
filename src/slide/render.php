<?php
/**
 * Conditionally show slide if hideSlide attribute does not exist
 */

if ( ! isset( $attributes['hideSlide'] ) || $attributes['hideSlide'] === false ) {
	echo wp_kses_post($content);
}