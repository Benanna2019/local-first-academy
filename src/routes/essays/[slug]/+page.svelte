<script>
	export let data;
	import BlurFade from '$lib/components/motion/blurfade.svelte';
	import Particles from '@/lib/components/motion/particles.svelte';
	import { SITE_URL } from '@/lib/site-config';

	const { title, excerpt, coverImage, coverWidth, coverHeight } = data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<meta property="og:image" content={`${SITE_URL}${coverImage}`} />
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<meta name="twitter:image" content={`${SITE_URL}${coverImage}`} />
</svelte:head>

<BlurFade delay={0.25} class="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
	<section class="w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-32">
		<div class="fade animate-fade absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip">
			<!-- Keep this but find ideas more fitting for pages -->
			<!-- <div
				class="parallax-element absolute top-0 flex h-max w-full transform-gpu items-end justify-end"
				style="transform: translateY(-73.2px) translate3d(0px, 0px, 0px);"
			>
				<img
					alt="Satellite"
					class="homepageBounce mr-[10%] mt-[10%]"
					height="400"
					src=""
					loading="lazy"
					width="400"
				/>
			</div> -->
		</div>
		<header>
			<BlurFade delay={0.7} class="flex flex-col gap-6 sm:gap-10">
				<h1
					class="mx-auto max-w-5xl text-center text-7xl font-[800] text-white sm:text-[80px] [@media(max-width:500px)]:text-5xl"
				>
					{title}
				</h1>
				<h2 class="mx-auto max-w-3xl text-balance text-xl font-medium text-neutral-100">
					{excerpt}
				</h2>
			</BlurFade>
		</header>
	</section>
	<section class="relative z-10 flex w-full gap-14 px-6 sm:pb-16">
		<div
			class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between"
		>
			<Particles className="absolute inset-0" refresh={true} />
			<div
				class="prose prose-p:opacity-90 prose-img:rounded-xl z-20 mx-auto w-5/6 max-w-3xl text-white"
			>
				<svelte:component this={PostContent} />
			</div>
		</div>
	</section>
</BlurFade>
