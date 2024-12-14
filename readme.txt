=== Block Slider Swiper ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags: slider
Requires at least: 6.6
Tested up to:      6.6
Stable tag:        1.0.0
Requires PHP:      5.6
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Slider based on very popular library Swiper! Insert blocks as slides. Truly open source.

== Description ==

Block based slider, leverages the speed and versatility of the [Swiper slider](https://swiperjs.com/).

👆 Try demo - there is a "Live preview" button on the top of this page 👆

= Key Features =

- 🥇 **Insert Any Block as a Slide**: No restrictions! Use the full power of the WordPress block editor.
- 🥈 **Flexible Configuration**: Use Swiper’s full range of features by entering the JSON configuration.
- 🥉 **Lightweight & Fast**: Uses only [Swiper](https://swiperjs.com/) library as dependency.
- 🌟 **Developer-Friendly**: The source code is fully available, making it easy to customize with hooks.

= JSON configuration how to =

Head to Swiper docs, to [Parameters](https://swiperjs.com/swiper-api#parameters) to find parameter you need and full parameters configuration is for many
parameters available further below on page, in [Modules](https://swiperjs.com/swiper-api#modules)
to find configuration parameters you need. Once you found them, write them as JSON instead as javascript object, i.e.:

`
{
	autoplay: {
		delay: 6000,
		disableOnInteraction: true
	},
	pagination: {
		clickable: true
	}
}
`

Your JSON configuration merges with default configuration needed for swiper to run. You can break slider functioning through miconfiguration,
so this is the first place to look if something does not work.

== Installation ==

= From block editor: =

Search for 'makeiteasy swiper slider' in the block editor when adding a new block via the '+' sign in the top bar.

= Standard Installation: =

1. Install the plugin through the WordPress plugins screen directly or upload the plugin files to the `/wp-content/plugins/makeiteasy-swiper-slider` directory.
2. Activate the plugin through the 'Plugins' screen in WordPress

== Frequently Asked Questions ==

= Why is [feature x] missing? =

Creating UI for every detail of Swiper slider is exceptionally demanding. That's why configuration in UI is limited, while JSON configuration is secure
and very powerful.

= Can I use it in other page builders (e.g. Elementor) =

Depends on page builder. Some builders also have third party add-ons which enable that.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Screenshots are stored in the /assets directory.
2. This is the second screen shot

== Changelog ==

= 1.0.0 =
Initial version

== Upgrade Notice ==

= 1.0.0 =
Initial version