/* eslint-disable @wordpress/no-unsafe-wp-apis */
import configs from '../../templates/default.json';
import { __experimentalGrid as Grid, Button } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { ReactComponent as DefaultIcon } from '../../templates/images/default.svg';
import { ReactComponent as ProgressBarIcon } from '../../templates/images/progressbar.svg';
import { ReactComponent as FractionIcon } from '../../templates/images/fraction.svg';
import { ReactComponent as ThreeSlides } from '../../templates/images/three-slides.svg';
import { ReactComponent as PerformanceIcon } from '../../templates/images/performance.svg';
import { ReactComponent as FreeModeIcon } from '../../templates/images/free-mode.svg';
import { ReactComponent as InfiniteLoopIcon } from '../../templates/images/infinite-loop.svg';
import { ReactComponent as FadeIcon } from '../../templates/images/fade.svg';
import { ReactComponent as CoverflowIcon } from '../../templates/images/coverflow.svg';

const allIcons = [
	DefaultIcon,
	ProgressBarIcon,
	FractionIcon,
	ThreeSlides,
	PerformanceIcon,
	FreeModeIcon,
	InfiniteLoopIcon,
	FadeIcon,
	CoverflowIcon,
];

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
				iconSize="50"
				onClick={ () => {
					setAttributes( {
						sliderSettings: templates[ config ].config,
					} );
				} }
				icon={ templates[ config ].icon ?? allIcons[ counter ] }
			/>
		);
		counter++;
	}

	return (
		<Grid
			columns={ 3 }
			alignment="center"
			className="mie-slider-layout-buttons"
			gap={ 2 }
		>
			{ configElements }
		</Grid>
	);
}
