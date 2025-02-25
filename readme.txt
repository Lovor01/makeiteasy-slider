=== Makeiteasy Slider ===
Contributors:      lovor
Donate link:       https://buymeacoffee.com/lovro
Tags:              slider, carousel, swiper, block
Tested up to:      6.7
Stable tag:        1.0.3
License:           LGPLv3
License URI:       https://www.gnu.org/licenses/lgpl-3.0.html

Slider based on very popular library Swiper! Insert blocks as slides. Truly open source.

== Description ==

Block based slider, leverages the speed and versatility of the [Swiper slider](https://swiperjs.com/).

= Key Features =

- 🥇 **Insert Any Block as a Slide**: No restrictions! Use the full power of the WordPress block editor.
- 🥈 **Flexible Configuration**: Use Swiper’s full range of features by entering the JSON configuration.
- 🥉 **Lightweight & Fast**: Uses only [Swiper](https://swiperjs.com/) library as dependency.
- 🌟 **Developer-Friendly**: The source code is fully available, making it easy to customize with hooks.

= JSON configuration how to =

Head to Swiper docs, to [Parameters section](https://swiperjs.com/swiper-api#parameters) to find parameter you need.
More elaborate configuration for some features is available further below on page, in [Modules section](https://swiperjs.com/swiper-api#modules).
Once you found the parameters you need, write them as JSON instead as javascript object, i.e.:

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

would be written as

`
{
	"autoplay": {
		"delay": 6000,
		"disableOnInteraction": true
	},
	"pagination": {
		"clickable": true
	}
}
`

And enter them on settings tab in block sidebar under Advanced slider configuration section.
You can learn more about JSON in [Stackoverflow blog](https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/) or on [W3schools page](https://www.w3schools.com/js/js_json_intro.asp).

Your JSON configuration merges with default configuration needed for swiper to run. You can break slider functioning through misconfiguration, so this is the first place to look if something does not work.
There is a built in syntax checker in Advanced slider settings box,

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

Depends on page builder. Some builders also have third party add-ons which enable using blocks.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Screenshots are stored in the /assets directory.
2. This is the second screen shot

== Changelog ==

= 1.0.3 =
Deprecating "two sliddes horizontal" editor view mode in favor of calculating slide widths according to Swiper's slidesPerView setting.

= 1.0.2 =
Minimum slide width in editor breaks display in editor when slides are small images - this is reverted back to v1.0.0.

= 1.0.1 =
Set minimum slide width in editor
Enable styling colors in slider background and slider colors which could be inherited (Color section in block sidebar).

= 1.0.0 =
Initial version

== Upgrade Notice ==

= 1.0.0 =
Initial version

== Developers ==

There is a full source code on [github](https://github.com/Lovor01/makeiteasy-slider). You can investigate code, adjust it to your needs, collaborate, ...