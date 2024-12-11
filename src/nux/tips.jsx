/**
 * Guide for the user to get started with the plugin.
 */

// @see https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/guide
import { Guide, ExternalLink } from '@wordpress/components';
// import { Suspense } from '@wordpress/element';
// import { store as coreStore } from '@wordpress/core-data';
import {
	// useSuspenseSelect,
	dispatch,
	useSelect,
	useDispatch,
} from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { ReactComponent as ImgPage1 } from './images/welcome-p1.svg';
import { ReactComponent as ImgPage2 } from './images/welcome-p2.svg';
import { ReactComponent as ImgPage3 } from './images/welcome-p3.svg';

// initialize defaults
export function init() {
	dispatch( preferencesStore ).setDefaults( 'makeiteasy/slider', {
		welcomeGuide: true,
	} );
}

export function showGuideNow() {
	dispatch( preferencesStore ).set(
		'makeiteasy/slider',
		'welcomeGuide',
		true
	);
}

export default function () {
	// const { url } = useSuspenseSelect(
	// 	( select ) => select( coreStore ).getSite(),
	// 	[]
	// );
	const showGuide = useSelect( ( select ) =>
		select( preferencesStore ).get( 'makeiteasy/slider', 'welcomeGuide' )
	);
	const { toggle } = useDispatch( preferencesStore );

	if ( ! showGuide ) {
		return null;
	}

	return (
		<Guide
			onFinish={ () => toggle( 'makeiteasy/slider', 'welcomeGuide' ) }
			className="edit-post-welcome-guide"
			pages={ [
				{
					image: (
						// <Suspense fallback={ <div>Loading...</div> }>
						// 	<img
						// 		src={ url }
						// 		alt={ __(
						// 			'First step image',
						// 			'makeiteasy-slider'
						// 		) }
						// 	/>
						// </Suspense>
						<ImgPage1 />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Welcome to Make IT easy slider!',
									'makeiteasy-slider'
								) }
							</h1>
							<p className="edit-post-welcome-guide__text">
								{ __(
									"To insert slider into the post, find 'Slider' block under Media group.",
									'makeiteasy-slider'
								) }
							</p>
						</>
					),
				},
				{
					image: <ImgPage2 />,
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Slide', 'makeiteasy-slider' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										"Click '+' rectangle to the right of the slider to insert slide block.",
										'makeiteasy-slider'
									) }
								</p>
								<p>
									{ __(
										'Slide block is auxiliary block which can be only inserted within the slider. It is a placeholder for slide content.',
										'makeiteasy-slider'
									) }
								</p>
							</div>
						</>
					),
				},
				{
					image: <ImgPage3 />,
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'JSON configuration',
									'makeiteasy-slider'
								) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'This slider offers extremely powerful option to harness the capabilities of the Swiper library, on which it is built.',
										'makeiteasy-slider'
									) }
								</p>
								<p>
									{
										// eslint-disable-next-line @wordpress/i18n-no-flanking-whitespace
										__( 'Go to ', 'makeiteasy-slider' )
									}
									<span>
										<ExternalLink href="https://swiperjs.com/swiper-api#parameters">
											Swiper configuration page
										</ExternalLink>
									</span>
									{
										// eslint-disable-next-line @wordpress/i18n-no-flanking-whitespace
										__(
											' and assemble your slider configuration as JSON (not javascript object) and paste it under advanced slider settings.',
											'makeiteasy-slider'
										)
									}
								</p>
							</div>
						</>
					),
				},
			] }
		/>
	);
}
