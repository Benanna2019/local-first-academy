<script lang="ts">
	import {
		SITE_URL,
		DEFAULT_OG_IMAGE,
		DEFAULT_OG_IMAGE_WIDTH,
		DEFAULT_OG_IMAGE_HEIGHT
	} from '$lib/site-config';

	$effect.pre(() => {
		window.location.href = 'https://newsletter.localfirstacademy.com/';
	});
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>Local First Newsletter</title>
	<meta data-key="description" name="description" content="Local First Newsletter" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Local First Newsletter" />
	<meta name="twitter:title" content="Local First Newsletter" />
	<meta
		property="og:description"
		content="Subscribe to our newsletter to stay up to date on our latest projects and news."
	/>
	<meta
		name="twitter:description"
		content="Subscribe to our newsletter to stay up to date on our latest projects and news."
	/>
	<meta property="og:image" content={`${SITE_URL}${DEFAULT_OG_IMAGE}`} />
	<meta property="og:image:width" content={DEFAULT_OG_IMAGE_WIDTH} />
	<meta property="og:image:height" content={DEFAULT_OG_IMAGE_HEIGHT} />
	<meta name="twitter:image" content={`${SITE_URL}${DEFAULT_OG_IMAGE}`} />
</svelte:head>
