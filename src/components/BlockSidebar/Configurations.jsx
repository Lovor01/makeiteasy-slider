/* eslint-disable @wordpress/no-unsafe-wp-apis */
import configs from '../../templates/default.json';
import { __experimentalGrid as Grid, Button } from '@wordpress/components';
import { ReactComponent as DefaultIcon } from './default-slider-icon.svg';

export default function Configurations() {
	const configElements = [];
	for ( const config of configs ) {
		configElements.push(
			<Button
				key={ config }
				className="mie-config-button"
				onClick={ () => {} }
				icon={ config.icon ?? DefaultIcon }
			>
				{ config.name }
			</Button>
		);
	}

	return <Grid>{ configElements }</Grid>;
}
