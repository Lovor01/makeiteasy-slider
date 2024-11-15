<?php
/**
 * Wraps children in swiper slide element - works with output of save
 */

// phpcs:disable WordPress.NamingConventions.ValidVariableName.VariableNotSnakeCase
// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
// phpcs:disable WordPress.PHP.YodaConditions.NotYoda

// Load the HTML into DOMDocument
$doc = new DOMDocument();
// LIBXML_NOERROR because errors when parsing HTML5 with HTML4 parser
$doc->loadHTML( $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD | LIBXML_NOERROR );

// Find the wrapper div element
$wrapper = $doc->documentElement->firstChild;

if ( $wrapper ) {
	// Iterate through all children and wrap each in a new div
	$children = [];
	foreach ( $wrapper->childNodes as $child ) {
		if ( $child->nodeType === XML_ELEMENT_NODE ) {
			$children[] = $child; // Collect child elements
		}
	}

	// Wrap each collected child element
	foreach ( $children as $child ) {
		// Create a new wrapper div
		$newDiv = $doc->createElement( 'div' );
		$newDiv->setAttribute( 'class', 'swiper-slide' );

		// Move the existing child into the new div
		$newDiv->appendChild( $child->cloneNode( true ) );

		// Replace the old child with the new wrapped div
		$wrapper->replaceChild( $newDiv, $child );
	}
}

// Output the modified HTML
//phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
echo $doc->saveHTML();
