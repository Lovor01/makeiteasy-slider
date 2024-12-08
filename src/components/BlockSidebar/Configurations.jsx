/* eslint-disable @wordpress/no-unsafe-wp-apis */
import configs from '../../templates/default.json';
import { __experimentalGrid as Grid, Button } from '@wordpress/components';
import { ReactComponent as DefaultIcon } from './default-slide.svg';
import { useMemo } from '@wordpress/element';

export default function Configurations( {
	attributes: { sliderSettings },
	setAttributes,
} ) {
	const configElements = [];
	const templates = useMemo(
		() =>
			Object.entries( configs?.templates ).reduce(
				( acc, [ key, value ] ) => {
					acc[ key ] = {
						...value,
						config: JSON.stringify( value.config ),
					};
					return acc;
				},
				{}
			),
		[]
	);
	let counter = 0;
	for ( const config in templates ) {
		configElements.push(
			<Button
				key={ counter }
				className="mie-config-button"
				isPressed={ sliderSettings === templates[ config ].config }
				label={ config }
				showTooltip
				size="default"
				iconSize="64"
				onClick={ () => {
					setAttributes( {
						sliderSettings: templates[ config ].config,
					} );
				} }
				icon={ templates[ config ].icon ?? DefaultIcon }
			/>
		);
		counter++;
	}

	return (
		<Grid
			columns={ 3 }
			alignment="center"
			className="mie-slider-layout-buttons"
		>
			{ configElements }
		</Grid>
	);
}
