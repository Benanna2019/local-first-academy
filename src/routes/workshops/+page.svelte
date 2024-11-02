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
					class="reveal animate-revealHero1 text-balance text-7xl font-[800] leading-[1] -tracking-[2.5px] text-white sm:text-[80px] [@media(max-width:500px)]:text-5xl"
				>
					Local First Web <br class="hidden lg:inline" />
					Development Workshops
				</h1>
				<h2
					class="reveal animate-revealHero2 -mt-2 text-balance text-xl font-medium text-neutral-100 sm:-mt-4"
				>
					Practical workshops for learning <br class="hidden lg:inline" />
					and building local first applications.
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
		<Particles className="absolute inset-0" refresh={true} />
	</section>
</BlurFade>
