<script>
	import BlurFade from '$lib/components/motion/blurfade.svelte';
	import Particles from '@/lib/components/motion/particles.svelte';
</script>

<BlurFade delay={0.25} class="pointer-events-none left-0 top-0 -z-10 h-full w-full overflow-x-clip">
	<section class="min-h-screen w-full px-6 pb-12 pt-16 sm:pb-20 sm:pt-52">
		<div
			class="fade animate-fade pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip"
		>
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
					Free Local <br class="hidden lg:inline" />
					First Tutorials
				</h1>
				<h2
					class="reveal animate-revealHero2 -mt-2 text-balance text-xl font-medium text-neutral-100 sm:-mt-4"
				>
					A collection of practical, exercise <br class="hidden lg:inline" />
					driven tutorials for creating homebaked software.
					<br class="hidden lg:inline" />
				</h2>
			</BlurFade>
		</header>
		<Particles className="absolute inset-0" refresh={true} />
	</section>
</BlurFade>
