import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const workshops = await getWorkshops();
		return {
			workshops
		};
	} catch (err) {
		error(404, String(err));
	}
};

async function getWorkshops() {
	let workshops: Workshop[] = [];

	const paths = import.meta.glob('/src/lib/content/workshops/*.(md)', { eager: true });

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Workshop;
			const post = { ...metadata, generatedSlug: slug } satisfies Workshop;

			const publishDate = new Date(post.published);
			publishDate.setHours(0, 0, 0, 0);

			if (post.published && publishDate <= today) {
				workshops.push(post);
			}
		}
	}

	workshops = workshops.sort(
		(first, second) => new Date(second.published).getTime() - new Date(first.published).getTime()
	);

	return workshops;
}

export interface Workshop {
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
