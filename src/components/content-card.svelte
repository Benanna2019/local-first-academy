<script lang="ts">
	type ContentCardProps = {
		essay: {
			title: string;
			excerpt: string;
			published: Date;
			coverImage: string;
			coverWidth: number;
			coverHeight: number;
			slug: string;
			generatedSlug: string;
		};
	};

	let hoveringCard = $state(false);

	let { essay }: ContentCardProps = $props();
	let { title, excerpt, published, coverImage, coverWidth, coverHeight, slug } = essay;
</script>

<a
	class="reveal animate-revealContent group relative flex flex-col overflow-hidden rounded-md bg-neutral-900 transition-colors duration-300 ease-out hover:cursor-pointer sm:hover:bg-neutral-800"
	rel="prefetch"
	href={`/essays/${slug}`}
	style="animation-duration: 2s; animation-delay: 1s;"
>
	<!-- <div class="relative aspect-video max-h-[300px] w-full overflow-hidden">
		 <img
			alt={title}
			loading="lazy"
			decoding="async"
			data-nimg="fill"
			class="object-cover transition-transform duration-700 ease-out sm:group-hover:scale-105"
			src={coverImage}
			style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
		/> 
	</div> -->
	<h3 class="mb-4 mt-6 px-6 text-xl font-semibold text-neutral-100">
		{title}
	</h3>
	<p class="relative flex max-w-xl grow px-6 text-sm font-normal text-neutral-400">
		{excerpt}
	</p>
	<p class="font-regular my-6 px-6 text-xs font-normal text-neutral-400 opacity-90">
		<time datetime={published.toISOString()}>
			{published.toLocaleDateString('en-us', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})}
		</time>
	</p>
	<div
		class="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-opacity sm:group-hover:opacity-100"
	>
		<span
			class="*:ease-bounce relative flex size-5 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms]"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				fill="currentColor"
				viewBox="0 0 256 256"
				class="group-active:translate-x-5 sm:group-hover:translate-x-5"
				><path
					d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"
				></path></svg
			>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 140 140"
				fill="white"
				class="absolute -translate-x-5 group-active:translate-x-0 sm:group-hover:translate-x-0"
			>
				<path
					d="M124,35c0-1.2-.5-2.1-1.8-2-3.9.4-7.7.9-11.6,1.1-8.3-9.2-19.6-15.4-31.8-17.6-.3-.6-.7-1.1-1.1-1.6-.6-1-1.3-1.9-1.9-2.8-1.4-1.9-2.9-3.8-4.5-5.6-.8-.9-2.2-.5-2.9.4-2.5,3.6-5.4,7-8.4,10.1,0,0,0,0-.1.1,0,0,0,0,0,0-11.6,2.8-23.1,7.7-31.2,16.7-.1,0-.3,0-.4,0-1.2-.1-2.3-.2-3.5-.2-1.2,0-2.3,0-3.5.2-.8,0-1.7.2-2.3-.2-.6-.3-1.1-.3-1.6-.1,0,0,0,0-.1,0-1,.3-1.4,1.2-1.2,2.2,1.1,4.7,2.1,9.4,3.2,14,0,.1,0,.3,0,.4-3.4,11.6-3.6,24.2-.1,35.9,3.6,12.1,11.1,22.7,21.5,29.8,5.9,4,12.4,6.7,19.5,7.7,7.4,1.1,14.9.6,22.2-.8,6.7-1.4,13.2-3.7,18.8-7.7,5.4-3.9,9.8-8.9,13.4-14.5,8.3-13.2,11.6-29.1,7.9-44.5-.4-1.9-1-3.7-1.7-5.6,0,0,0-.2,0-.2.5-2.8,1.1-5.6,1.7-8.4.2-.9,1.6-4.5,1.5-6.8ZM117.5,47.8c-2.9,0-5.7.1-8.6.4,0-.3.2-.6.3-.9.3-1.2.6-2.4.9-3.7.5-1.9.8-3.9,1.2-5.9,2.9-.2,5.7-.5,8.6-.8-.9,3.6-1.7,7.2-2.4,10.8ZM108.1,36s0,0,0,0c0,0,0,0,0,0-.4,2.2-.9,4.4-1.4,6.7-.3,1.2-.6,2.3-.9,3.5-.3,1.2-.6,2.5-1.1,3.6,0,.1,0,.3,0,.4-1,1-2.1,2-3.1,3-.6.5-1.1,1.1-1.7,1.6-.2.2-.4.4-.6.6-3.6.4-7.2.7-10.8.6,0,0-.2,0-.3,0-5.2-2.9-10.9-4.5-16.8-4.9,0-7,0-14.1,0-21.1,1.5-2,3-3.9,4.6-5.8.8-1,1.5-2,2.3-3,.3-.5.7-.9.9-1.4,11.1,2.2,21.1,7.9,28.8,16.2ZM70.3,119.9c-5.6.4-11.1,0-16.2-2.5-4.8-2.4-8.9-6.1-11.8-10.6-6.6-10-8-23.6-2.8-34.5,1.3-2.6,3-5,4.9-7.1.8.9,1.6,1.7,2.5,2.5,5,5,10,10.1,15.3,14.8-.4.6-.7,1.3-.9,2-1.1,3.6.2,7.5,3.2,9.8,2.9,2.2,6.9,2.3,10,.5,3.2-1.9,5.2-5.8,4.2-9.5-.3-1-.8-1.9-1.5-2.8-.6-.8-1.3-1.7-2-2.4-1-1-2.4-1.7-3.8-1.9,0,0,0-.1,0-.2.2-4,0-8.1,0-12.1,0-3.9,0-7.8,0-11.6,5.4.4,10.6,1.9,15.3,4.5-.2,1.6-.5,3.2-.7,4.9-.2,1.8-.4,3.7-.6,5.5-.2,1.1.5,2.3,1.8,2.3,1.1,0,2.2-.3,3.2-.5,1-.1,2.1,0,3.1,0,1.9.1,3.9.2,5.7-.4,6.1,10.2,6.6,23.4.4,33.7-6.2,10.3-17.6,14.8-29.1,15.6ZM68,65.9c0,4-.2,8.1,0,12.1,0,0,0,0,0,0-1.2.4-2.4,1-3.4,1.7-5-4.9-10.2-9.7-15.1-14.7-.8-.8-1.6-1.6-2.4-2.5,5.3-4.4,12.1-7.3,18.9-8.1.7,0,1.4-.1,2.1-.2,0,3.9,0,7.7,0,11.6ZM60.5,20.3c2.2,3.5,4.8,6.7,7.6,9.7,0,7.1,0,14.1,0,21.2-5.2.3-10.4,1.8-15.1,4-2.9,1.4-5.7,3.1-8.1,5.2-3.6-3.6-7.1-7.3-10.5-11.1-.4-2.3-.9-4.6-1.3-6.9-.2-1.2-.5-2.3-.7-3.5-.2-1.1-.3-2.5-.8-3.5,7.6-8.2,18.3-12.6,29-15.2ZM23,37.4c1.1,0,2.2,0,3.2,0,.5,0,1.1,0,1.6,0,.2,0,.4,0,.6,0,.2.8.2,1.6.4,2.4.2,1.2.4,2.3.7,3.5.3,1.7.6,3.3.9,5-1.3.2-2.6.3-3.9.2-.9,0-1.7-.3-2.6-.4-.5,0-1,0-1.4,0,0,0,0,0,0,0,0-.2,0-.4-.1-.6-.1-.6-.3-1.2-.4-1.9-.3-1.2-.5-2.4-.8-3.7-.3-1.5-.7-3-1-4.6,1,0,2-.1,3-.2ZM23.4,88.9c-4.1-11.1-4.7-23.3-2-34.8.2-.7.3-1.4.5-2.1.5,0,.9-.2,1.5-.1.5,0,1,.2,1.5.2,2.4.4,4.7.1,7-.2,3.4,3.7,6.7,7.4,10.2,11-1.1,1.1-2.1,2.4-3,3.7-7.7,11.1-7.7,26.2-1.8,38,2,3.9,4.6,7.5,7.8,10.4-10-5.9-17.7-15.2-21.8-26.1ZM120.3,75c-1.8,13-7.6,25.8-17.5,34.6-3.4,3-7.3,5.4-11.4,7.1,2.9-1.8,5.6-4.1,7.9-6.9,8.5-10.4,9.9-25,4.4-37.1-.7-1.5-1.5-3-2.4-4.4,0-.1-.2-.2-.3-.3,0-.2,0-.5,0-.7,0-1.1.1-2.2.2-3.3.1-1.9.2-3.8.3-5.7.3-.3.5-.5.8-.8.6-.6,1.1-1.1,1.7-1.7,1.1-1.1,2.3-2.2,3.4-3.3.2-.2.3-.3.4-.5,3.3-.3,6.6-.5,9.9-.5.4,0,1.5,4.8,1.6,5.3.5,2,.8,3.9,1.1,5.9.4,3.8.5,7.6,0,11.3,0,.3,0,.6-.1.9Z"
				/>
			</svg>
		</span>
	</div></a
>
