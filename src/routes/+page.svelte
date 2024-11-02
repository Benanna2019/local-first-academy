<script>
	import BlurFade from '$lib/components/motion/blurfade.svelte';
	import LoFiOrbit from '@/lib/components/lofi-orbit.svelte';
	import Particles from '@/lib/components/motion/particles.svelte';
</script>

<BlurFade delay={0.25} class="pointer-events-none left-0 top-0 -z-10 w-full overflow-x-clip">
	<section class="min-h-screen w-full overflow-visible px-6 pb-12 pt-16 sm:pb-20 sm:pt-52">
		<div
			class="fade animate-fade pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-x-clip"
		>
			<div
				class="parallax-element absolute top-0 h-[1000px] w-full transform-gpu after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-black after:to-black/0"
				style="transform: translateY(-55.3px) translate3d(0px, 0px, 0px);"
			>
				<div
					class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between"
				>
					<LoFiOrbit />
					<Particles className="absolute inset-0" refresh={true} />
				</div>
			</div>
			<!-- Keep this but find ideas more fitting for pages -->
			<div
				class="flex h-max w-full transform-gpu items-end justify-end"
				style="transform: translateY(-73.2px) translate3d(0px, 0px, 0px);"
			>
				<!-- <img
					alt="Satellite"
					class="homepageBounce mr-[10%] mt-[10%]"
					height="400"
					src=""
					loading="lazy"
					width="400"
				/> -->
			</div>
		</div>
	</section>
	<section class="relative z-10 flex w-full gap-14 px-6 sm:pb-16">
		<div
			class="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-10 lg:flex-nowrap lg:justify-between"
		>
			<Particles className="absolute inset-0" refresh={true} />
			<div
				class="prose prose-neutral prose-invert prose-h2:-mt-20 prose-h2:pt-28 prose-p:opacity-90 prose-img:rounded-xl sm:hover:prose-a:no-underline mx-auto w-5/6 max-w-3xl text-white"
			>
				<h2 class="text-3xl font-bold">Inspiration & Background</h2>
				<p class="pb-4 pt-4 text-lg">
					It is tempting to want to give some grand ideology for building Local First Software.
					After all, this should be an academy and academies tend to have some sort of mantra. If
					there was something at the core of Local First Software, and there are many things, I
					think it would be this:
				</p>
				<blockquote class="border-l-2 border-gray-200 pl-4 text-lg font-semibold italic">
					What if building web apps didn't have to be so complicated?
				</blockquote>
				<p class="pt-4 text-lg">
					This statement has been echoed by many leaders in the Local First movement and this is why
					the academy exists. Not only to help you build from a Local First paradigm but to simplify
					the things that should be simple.
				</p>
				<p class="pt-4 text-lg">
					There are many other ideals to Local First that will be elaborated on in what we hope are
					the years to come. But for now the hope and aim of this academy is to help people build
					software in a more simplified way by thinking Local First.
				</p>
				<p class="pt-4 text-lg">
					If you are interested in following along, you can create an account/sign up and we will
					send updates via email newsletters.
				</p>
				<p class="pt-4 text-lg">
					Thank you and we look forward to building out the academy and going on this journey with
					you.
				</p>
				<p class="pt-4 text-lg">
					- <span class="italic">Local First Academy</span>
				</p>
			</div>
		</div>
	</section>
</BlurFade>
