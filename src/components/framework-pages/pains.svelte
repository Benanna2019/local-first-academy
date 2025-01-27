<script lang="ts">
	import { writable, derived } from 'svelte/store';

	// Define the pain points
	const problemPoints = [
		{
			id: 'keeping-in-sync',
			title: 'Keeping in Sync',
			description:
				'When you have multiple components or devices that need to share the same state, you need to ensure they stay in sync, especially during offline scenarios or network interruptions.'
		},
		{
			id: 'managing-conflicts',
			title: 'Managing Conflicts',
			description:
				'When multiple components or users update the same state, you need to handle conflicts and decide how to merge changes without losing data.'
		},
		{
			id: 'storing-data',
			title: 'Storing Data',
			description:
				'When you have multiple components that need to access the same state, you need a reliable way to store the data locally, especially for offline access.'
		},
		{
			id: 'managing-data-flow',
			title: 'Managing Data Flow',
			description:
				'When data moves between local and remote sources, you need to ensure a smooth flow, handle synchronization efficiently, and maintain consistency.'
		},
		{
			id: 'managing-reactivity',
			title: 'Managing Reactivity',
			description:
				'When the state changes locally or remotely, you need to update the UI or other dependent components in real-time to keep everything responsive.'
		}
	];

	// Import the project data from a JSON file
	import projectsData from './projects.json';

	interface Project {
		id: string;
		projectName: string;
		description: string;
		painPoints: string[];
		bestFor: string[];
		link: string;
		icon: string;
		projectMaintainer: string;
	}

	const projects: Project[] = projectsData.sort((a, b) =>
		a.projectName.localeCompare(b.projectName)
	);

	// State for selected pain points
	const selectedPainPoints = writable<string[]>([]);

	// Derived store to filter projects based on selected pain points
	const filteredProjects = derived(selectedPainPoints, ($selectedPainPoints) => {
		return projects.filter((project) =>
			$selectedPainPoints.every((painPoint) => project.painPoints.includes(painPoint))
		);
	});

	// Function to toggle pain point selection
	const togglePainPoint = (painPoint: string) => {
		selectedPainPoints.update((current) => {
			if (current.includes(painPoint)) {
				return current.filter((id) => id !== painPoint);
			} else {
				return [...current, painPoint];
			}
		});
	};
</script>

<main class="bg-gray-900 p-6 text-white">
	<!-- Pain Points Checkboxes -->
	<h3 class="mb-4 text-2xl font-bold">Filter by Pain Points</h3>
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each problemPoints as point}
			<div class="flex items-center space-x-2">
				<input
					type="checkbox"
					id={point.id}
					value={point.id}
					on:change={() => togglePainPoint(point.id)}
					bind:group={$selectedPainPoints}
					class="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
				/>
				<label for={point.id} class="text-sm">{point.title}</label>
			</div>
		{/each}
	</div>

	<!-- Filtered Projects -->
	<div class="mt-8">
		<h3 class="mb-4 text-2xl font-bold">Projects</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#if $filteredProjects.length === 0}
				<div class="text-gray-400">No projects match the selected filters.</div>
			{/if}
			{#each $filteredProjects as project (project.id)}
				<div class=" mb-4 flex rounded-lg border border-gray-700 bg-gray-800 p-4">
					<div class="mr-8 flex h-32 w-32 items-center justify-center">
						<img src={project.icon} alt={project.projectName} class="h-12 w-12" />
					</div>
					<div>
						<h4 class="text-xl font-semibold">
							<a href={project.link} target="_blank"
								>{project.projectName} ({project.projectMaintainer})</a
							>
						</h4>
						<p class="text-sm text-gray-400">{project.description}</p>
						<div class="mt-2">
							<strong class="block text-sm text-gray-200">Pain Points it solves:</strong>
							<ul class="list-inside list-disc">
								{#each project.painPoints as item (item)}
									<li class="text-sm text-gray-400">
										{problemPoints.find((it) => it.id === item)?.title}
									</li>
								{/each}
							</ul>
						</div>
						<div class="mt-2">
							<strong class="block text-sm text-gray-200">Best For:</strong>
							<ul class="list-inside list-disc">
								{#each project.bestFor as item}
									<li class="text-sm text-gray-400">
										{item}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
