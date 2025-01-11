import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const tutorials = await getTutorials();
		return {
			tutorials
		};
	} catch (err) {
		error(404, String(err));
	}
};

async function getTutorials() {
	let tutorials: Tutorial[] = [];

	const paths = import.meta.glob('/src/lib/content/tutorials/*.(md)', { eager: true });

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Tutorial;
			const post = { ...metadata, generatedSlug: slug } satisfies Tutorial;

			// ... rest of the check remains the same ...
			const publishDate = new Date(post.published);
			publishDate.setHours(0, 0, 0, 0);

			if (post.published && publishDate <= today) {
				tutorials.push(post);
			}
		}
	}

	tutorials = tutorials.sort(
		(first, second) => new Date(second.published).getTime() - new Date(first.published).getTime()
	);

	return tutorials;
}

export interface Tutorial {
	title: string;
	slug: string;
	generatedSlug: string;
	excerpt: string;
	coverImage: string;
	coverWidth: number;
	coverHeight: number;
	published: string;
	youtubeLink: string;
	updated?: string;
	categories: string[];
}
