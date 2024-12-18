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
import { ReactComponent as ImgPage4 } from './images/welcome-p4.svg';
import { ReactComponent as ImgPage5 } from './images/welcome-p5.svg';

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
						<ImgPage1 className="edit-post-welcome-guide__image" />
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
					image: (
						<ImgPage2 className="edit-post-welcome-guide__image" />
					),
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
					image: (
						<ImgPage3 className="edit-post-welcome-guide__image" />
					),
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
				{
					image: (
						<ImgPage4 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'How to create JSON?',
									'makeiteasy-slider'
								) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										'Configuration described on',
										'makeiteasy-slider'
									) + ' ' }
									<span>
										<ExternalLink href="https://swiperjs.com/swiper-api#parameters">
											swiper configuration page
										</ExternalLink>
									</span>
									{ __(
										'is for JavaScript object.',
										'makeiteasy-slider'
									) }
								</p>
								<p>
									{ __(
										'To make JSON, just wrap each property in double qoutes and wrap everything in curly brackets.',
										'makeiteasy-slider'
									) }
								</p>
							</div>
						</>
					),
				},
				{
					image: (
						<ImgPage4 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __( 'Example', 'makeiteasy-slider' ) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<pre>
									<code>slidesPerView: 1,</code>
									<br />
									<code>spaceBetween: 30,</code>
									<br />
									<code>loop: true,</code>
									<br />
									<code>autoplay: &#123; delay: 2500,</code>
									<br />
									<code>
										disableOnInteraction: false &#125;
									</code>
								</pre>

								<p>
									{ __(
										'becomes as JSON:',
										'makeiteasy-slider'
									) }
								</p>
								<pre>
									<code>
										&quot;slidesPerView&quot;:
										&quot;1&quot;,
									</code>
									<br />
									<code>&quot;spaceBetween&quot;: 30,</code>
									<br />
									<code>&quot;loop&quot;: true,</code>
									<br />
									<code>
										&quot;autoplay&quot;: &#123;
										&quot;delay&quot;: 2500,
									</code>
									<br />
									<code>
										&quot;disableOnInteraction&quot;: false
										&#125;
									</code>
								</pre>
							</div>
						</>
					),
				},
				{
					image: (
						<ImgPage5 className="edit-post-welcome-guide__image" />
					),
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Where to put JSON?',
									'makeiteasy-slider'
								) }
							</h1>
							<div className="edit-post-welcome-guide__text">
								<p>
									{ __(
										"In slider block sidebar, in settings tab, open 'Advanced slider settings'",
										'makeiteasy-slider'
									) }
								</p>
								<p>
									{ __(
										'There is a box with same title. Type or paste your JSON configuration there.',
										'makeiteasy-slider'
									) }
								</p>
							</div>
						</>
					),
				},
			] }
		/>
	);
}
