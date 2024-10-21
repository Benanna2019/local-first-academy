<script lang="ts">
	export let data;
	import BlurFade from '$lib/components/motion/blurfade.svelte';
	import ContentCard from '@/lib/components/content-card.svelte';
	import type { Essay } from './+page.js';

	const { essays }: { essays: Essay[] } = data;
</script>

<div class="left-0 top-0 -z-10 h-full w-full overflow-x-clip">
	<section class="w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-32">
		<div class="fade animate-fade absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip">
			<div
				class="parallax-element absolute top-0 h-[1000px] w-full transform-gpu after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-black after:to-black/0"
				style="transform: translateY(-55.3px) translate3d(0px, 0px, 0px);"
			>
				<img
					alt="page background"
					fetchpriority="high"
					decoding="async"
					data-nimg="fill"
					class="absolute inset-0 h-[100%] w-[100%] object-cover"
					src="/lofilibrary.png"
				/>
			</div>
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
			<BlurFade delay={0.7} class="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-10">
				<h1
					class="text-balance text-7xl font-[800] leading-[1] -tracking-[2.5px] text-white sm:text-[80px] [@media(max-width:500px)]:text-5xl"
				>
					Local First Essays <br class="hidden lg:inline" /> and deep dives
				</h1>
				<h2
					class="reveal animate-revealHero2 -mt-2 text-balance text-xl font-medium text-neutral-100 sm:-mt-4"
				>
					Research and learn the how and why <br class="hidden lg:inline" />
					of building local first applications.
					<br class="hidden lg:inline" />
				</h2>
				<!-- Should probably leave the below based off if they are logged in or not -->
				<!-- <div
					class="reveal animate-revealHero3 flex flex-col gap-2 sm:items-center [@media(min-width:340px)]:flex-row"
				>
					<a
						aria-label="Get started for free"
						class="group flex w-max items-center gap-1 rounded-full border-white bg-neutral-200 px-3.5 py-2 text-sm font-semibold text-neutral-800 transition-colors sm:hover:bg-white sm:hover:text-black"
						href="">Get started for free</a
					>
				</div> -->
			</BlurFade>
		</header>
	</section>
	<section class="relative flex w-full gap-14 px-6 pt-0 sm:pt-0">
		<div
			class="mx-auto flex w-full max-w-none flex-col items-center justify-between md:max-w-7xl"
			style="gap:64px"
		>
			<div
				class="grid w-full grid-cols-2 items-stretch gap-8 md:grid-cols-3 md:gap-10 [@media(max-width:400px)]:grid-cols-1"
			>
				{#each essays as essay}
					<ContentCard {essay} />
				{/each}
			</div>
		</div>
	</section>
</div>
