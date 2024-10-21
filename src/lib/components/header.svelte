<script lang="ts">
	// Components
	import Button from './ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Avatar from '$lib/components/ui/avatar';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';

	import { useUser } from '@/instantdb/useUser.svelte';
	import { db, id, tx } from '@/instantdb/db';

	let googleLoginUrl = $state('');

	$effect(() => {
		if (typeof window !== 'undefined') {
			googleLoginUrl = db.auth.createAuthorizationURL({
				clientName: 'Local First Academy',
				redirectURL: window.location.href
			});
		}
	});

	let authInitialized = $state(false);
	let renderMagicCodePage = $state(false);
	let email = $state('');

	let isToggled = $state(false);

	function toggleMobileMenu() {
		isToggled = !isToggled;
	}

	let user = useUser(db);

	function handleSignOut() {
		db.auth.signOut();
		// user = null;
		authInitialized = false;
	}

	async function handleSignIn(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		email = form.email.value;
		try {
			await db.auth.sendMagicCode({ email });
			renderMagicCodePage = true;
		} catch (error: unknown) {
			if (error instanceof Error && 'body' in error) {
				alert(`Error: ${(error as any).body?.message}`);
			} else {
				alert('An error occurred');
			}
		}
	}

	async function handleCodeSubmit(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const code = form.code.value || '';
		try {
			let response = await db.auth.signInWithMagicCode({ email, code });
			// if (response.user) {
			// 	db.transact([
			// 		tx.users[id()].update({
			// 			userId: response.user.id,
			// 			email: response.user.email,
			// 			createdAt: response.user.createdAt
			// 		})
			// 	]);
			// }
		} catch (error: unknown) {
			if (error instanceof Error && 'body' in error) {
				alert(`Error: ${(error as any).body?.message}`);
			} else {
				alert('An error occurred');
			}
		}
	}
</script>

<header
	class="sticky top-0 z-10 flex w-full justify-center px-6 pt-4 text-white before:pointer-events-none before:absolute before:top-0 before:h-56 before:w-full before:-translate-y-1/2 before:rounded-[100%] before:bg-gradient-to-b before:from-black/80 before:from-30% before:to-black/0 before:opacity-100 before:blur-2xl before:transition-opacity before:duration-300 before:ease-out"
>
	<div class="z-10 flex w-full max-w-[90rem] items-center justify-between text-inherit">
		<nav class=" w-full items-center justify-between md:flex">
			<a aria-label="Navigate to the homepage" href="/" class="w-1/4">
				Ｌｏｃａｌ Ｆｉｒｓｔ Ａｃａｄｅｍｙ</a
			>
			<ul class="relative hidden w-1/2 items-center bg-orange-600/0 text-sm font-medium md:flex">
				<li>
					<Button
						variant="link"
						aria-label="Workshops"
						class="group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-base font-medium text-white transition-colors sm:hover:text-neutral-300"
						href="/workshops">Workshops</Button
					>
				</li>
				<li>
					<Button
						variant="link"
						aria-label="Tips"
						class="group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-base font-medium text-white transition-colors sm:hover:text-neutral-300"
						href="/tips">Tips</Button
					>
				</li>
				<li>
					<Button
						variant="link"
						aria-label="Tutorials"
						class="group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-base font-medium text-white transition-colors sm:hover:text-neutral-300"
						href="/tutorials">Tutorials</Button
					>
				</li>
				<li>
					<Button
						variant="link"
						aria-label="Essays"
						class="group flex w-max cursor-default items-center gap-1 px-3.5 py-2 text-base font-medium text-white transition-colors sm:hover:text-neutral-300"
						href="/essays">Essays</Button
					>
				</li>
				<div
					class="invisible fixed left-1/2 top-10 origin-center -translate-x-1/2 -translate-y-2 scale-95 bg-transparent p-3 opacity-0 transition-all duration-200 lg:absolute lg:top-7"
				>
					<div
						class="fade absolute -bottom-5 left-1/2 z-10 w-max -translate-x-1/2 gap-4"
						style="animation-delay: 200ms;"
					>
						<div class="flex items-center drop-shadow-lg">
							<span
								class="mr-2 rounded bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-800"
								>↓</span
							>Enter menu
						</div>
						<div class="flex items-center drop-shadow-lg">
							<span
								class="mr-2 rounded bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-800"
								>tab</span
							>Navigate menu
						</div>
						<div class="flex items-center drop-shadow-lg">
							<span
								class="mr-2 rounded bg-neutral-100 px-2 py-0.5 text-xs font-bold text-neutral-800"
								>↑</span
							>Exit menu
						</div>
					</div>
					<div
						class="relative overflow-hidden rounded-xl border border-neutral-800/75 bg-neutral-950 p-2 shadow-2xl transition-[height,width] duration-200 ease-out"
						style="height: 100%; width: 100%;"
					></div>
				</div>
			</ul>
			<div class="hidden items-center gap-4 md:flex">
				<div class="w-1/4">
					{#if user.state.user}
						{@render userMenu()}
					{:else}
						<Dialog.Root>
							<Dialog.Trigger>
								<span
									aria-label="Log in"
									class="group relative flex w-max items-center gap-1 px-3.5 py-2 text-base font-medium text-white transition-colors sm:hover:text-neutral-300"
									>Log in<span
										class="pointer-events-none absolute left-1/2 top-0 mt-9 flex w-max -translate-x-1/2 select-none items-center gap-1.5 rounded border border-white/10 bg-white/20 p-0.5 pl-1 text-xs font-semibold text-white opacity-0 shadow-xl drop-shadow-sm backdrop-blur-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-500"
										>Login <span
											class="rounded-sm border border-white/20 bg-white/30 px-1 py-0 font-bold drop-shadow-sm"
											>O</span
										></span
									>
								</span>
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Description>
										{@render modalContent()}
									</Dialog.Description>
								</Dialog.Header>
							</Dialog.Content>
						</Dialog.Root>
					{/if}
				</div>
			</div>
		</nav>
		<button aria-label="Open mobile nav" class="p-2 md:hidden" onclick={toggleMobileMenu}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class={cn(
					'relative overflow-visible text-inherit transition-transform duration-500 ease-out',
					{ 'rotate-90': isToggled }
				)}
			>
				<!-- First Line of the X -->
				<path
					d="M20.4853 3.51473L3.51477 20.4853"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={cn('absolute origin-center translate-y-1 rotate-45', {
						'translate-y-0 rotate-90': isToggled
					})}
				/>
				<!-- Second Line of the X -->
				<path
					d="M20.4853 20.4853L3.51477 3.51471"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={cn('absolute origin-center -translate-y-1 -rotate-45', {
						'translate-y-0 rotate-90': isToggled
					})}
				/>
			</svg>
		</button>
	</div>
	{#if isToggled}
		<nav
			class="fade animate-fadeSm fixed top-0 h-screen w-full bg-black/50 px-6 pt-24 text-white backdrop-blur-2xl ease-out md:hidden"
		>
			<nav class="flex gap-10 [@media(min-width:400px)]:gap-20">
				<div class="flex flex-col">
					<div class="mb-6 w-full">
						<!-- <p class="pb-2 font-semibold opacity-50">Features</p> -->
						<ul>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/">Home</a>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/workshops">Workshops</a>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/tips">Tips</a>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/tutorials">Tutorials</a>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/essays">Essays</a>
							</li>
						</ul>
					</div>
					<!-- <div class="mb-6 w-full">
						<p class="pb-2 font-semibold opacity-50">Solutions</p>
						<ul>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/solutions/for-startups/">For startups</a>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/solutions/for-enterprise/">For enterprise</a>
							</li>
						</ul>
					</div> -->
				</div>
				<!-- <div class="flex flex-col">
					<div class="mb-6 w-full">
						<p class="pb-2 font-semibold opacity-50">Developers</p>
						<ul>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/downloads/">Downloads</a>
							</li>
							<li class="my-2 w-full">
								<a
									class="text-xl font-medium"
									rel="noopener noreferrer"
									target="_blank"
									href="">Documentation</a
								>
							</li>
							<li class="my-2 w-full">
								<a
									class="text-xl font-medium"
									rel="noopener noreferrer"
									target="_blank"
									href="https://discord.gg/k2J7jcJCvd">Community</a
								>
							</li>
						</ul>
					</div>
					<div class="mb-6 w-full">
						<p class="pb-2 font-semibold opacity-50">Company</p>
						<ul>
							<li class="my-2 w-full"><a class="text-xl font-medium" href="/about/">About</a></li>
							<li class="my-2 w-full"><a class="text-xl font-medium" href="/blog/">Blog</a></li>
							<li class="my-2 w-full">
								<a
									class="text-xl font-medium"
									rel="noopener noreferrer"
									target="_blank"
									href="">Twitter</a
								>
							</li>
							<li class="my-2 w-full">
								<a class="text-xl font-medium" href="/pricing/">Pricing</a>
							</li>
						</ul>
					</div>
				</div> -->
			</nav>
			<div class="mt-10 flex gap-4 *:inline *:w-1/2 *:text-center *:text-base">
				<a
					aria-label="Newsletter Sign Up"
					class="group flex w-max items-center gap-1 rounded-full border-white bg-neutral-200 px-3.5 py-2 text-sm font-semibold text-neutral-800 transition-colors sm:hover:bg-white sm:hover:text-black"
					href="https://faequeite.ck.page/eb37af7d8f">Newsletter</a
				>
				{#if user.state.user}
					<span
						aria-label="Profile"
						role="button"
						tabindex="0"
						class="group flex w-max items-center gap-1 rounded-full border-white bg-neutral-200 px-3.5 py-2 text-sm font-semibold text-neutral-800 transition-colors sm:hover:bg-white sm:hover:text-black"
						onclick={handleSignOut}
						onkeypress={handleSignOut}>Logout</span
					>
				{:else}
					<Dialog.Root>
						<Dialog.Trigger
							class="group flex w-max items-center gap-1 rounded-full border-white bg-neutral-200 px-3.5 py-2 text-sm font-semibold text-neutral-800 transition-colors sm:hover:bg-white sm:hover:text-black"
						>
							<span aria-label="Profile">Login</span>
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Description>
									{@render modalContent()}
								</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
					</Dialog.Root>
				{/if}
			</div>
		</nav>
	{/if}
	<div
		class="pointer-events-none absolute left-0 top-0 h-screen w-full select-none bg-black/10 opacity-0 backdrop-blur-sm transition-opacity duration-500 ease-out"
	></div>
</header>

{#snippet userMenu()}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button builders={[builder]} variant="link" size="icon">
				<Avatar.Root>
					{#if user.state.user.avatarUrl}
						<!-- <Avatar.Image src={user.state.user.avatarUrl} /> -->
					{/if}
					<Avatar.Fallback class="bg-transparent text-white">
						<CircleUser class="h-6 w-6" />
					</Avatar.Fallback>
				</Avatar.Root>
				<span class="sr-only">Toggle user menu</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<!-- <DropdownMenu.Item>Settings</DropdownMenu.Item>
			<DropdownMenu.Item>Support</DropdownMenu.Item>
			<DropdownMenu.Separator /> -->
			<DropdownMenu.Item onclick={handleSignOut}>Logout</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

{#snippet modalContent()}
	<div class="m-4 flex flex-col gap-8">
		{#if !renderMagicCodePage}
			<div class="flex w-[100%] flex-col items-center justify-center gap-4">
				<Dialog.Title>Log in with a magic code</Dialog.Title>
				<form id="email-input-form" onsubmit={handleSignIn} class="w-full space-y-4">
					<Input type="email" name="email" placeholder="Email" />
					<Button type="submit" class="w-full">Send code</Button>
				</form>
			</div>
		{:else}
			<div>
				<form id="magic-code-form" onsubmit={handleCodeSubmit} class="space-y-4">
					<Dialog.Title>Check your email</Dialog.Title>
					<p>We've sent a magic code to {email}. Enter it below to sign in.</p>
					<Input type="text" name="code" placeholder="Magic Code" />
					<Button type="submit">Verify code</Button>
				</form>
			</div>
		{/if}
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t"></span>
			</div>
			<div class="relative flex justify-center text-xs uppercase">
				<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
			</div>
		</div>
		<Button href={googleLoginUrl}>Log in with google</Button>
	</div>
{/snippet}
