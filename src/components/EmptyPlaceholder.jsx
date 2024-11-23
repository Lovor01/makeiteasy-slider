import { Placeholder } from '@wordpress/components';
import { _x } from '@wordpress/i18n';

const EmptyPlaceholder = () => (
	<Placeholder className="mie-empty-placeholder">
		{ _x(
			'Slider is empty.',
			'empty slider placeholder',
			'makeiteasy-popup'
		) }
		<br />
		{ _x(
			'Add slide by clicking on "plus".',
			'empty slider placeholder',
			'makeiteasy-popup'
		) }
		<br />
		{ _x(
			'Inside slide add Cover, Image, Media & Text or any other block.',
			'empty slider placeholder',
			'makeiteasy-popup'
		) }
	</Placeholder>
);

export default EmptyPlaceholder;
