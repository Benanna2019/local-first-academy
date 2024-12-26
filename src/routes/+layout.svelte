<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '@/lib/components/header.svelte';
	import Footer from '@/lib/components/footer.svelte';
	import { SITE_TITLE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site-config';

	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>{SITE_TITLE}</title>
	<link rel="canonical" href={SITE_URL} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={SITE_TITLE} />
	<meta name="Description" content={SITE_DESCRIPTION} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={SITE_TITLE} />
	<meta name="twitter:description" content={SITE_DESCRIPTION} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
</svelte:head>

<Header />
<snow-fall></snow-fall>
<main class="h-max">{@render children()}</main>
<Footer />
