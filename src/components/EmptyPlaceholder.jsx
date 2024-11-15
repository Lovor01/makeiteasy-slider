import { Placeholder } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

const EmptyPlaceholder = () => {
	return (
		<Placeholder className="mie-empty-placeholder">
			{ _x(
				'Slider is empty.',
				'empty slider placeholder',
				'makeiteasy-popup'
			) }
			<br />
			{
				_x(
					'Add blocks by clicking on "plus".',
					'empty slider placeholder',
					'makeiteasy-popup'
				)
				/*Slider je prazan. Dodajte blokove klikom na "plus".*/
			}
		</Placeholder>
	);
};

export default EmptyPlaceholder;

/**
 * Empty template, filterable
 */
export const emptySliderTemplate = applyFilters(
	'makeiteasy-slider-newSlideTemplate',
	[
		[
			'core/cover',
			{
				dimRatio: 60,
			},
			[
				[ 'core/heading', { placeholder: __( 'Slide Title…' ) } ],
				[ 'core/paragraph', { placeholder: __( 'Slide Text…' ) } ],
			],
		],
	]
);
