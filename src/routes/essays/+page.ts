import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const essays = await getEssays();
		return {
			essays
		};
	} catch (err) {
		error(404, String(err));
	}
};

async function getEssays() {
	let essays: Essay[] = [];

	const paths = import.meta.glob('/src/lib/content/essays/*.(md)', { eager: true });

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Essay;
			const post = { ...metadata, generatedSlug: slug } satisfies Essay;

			// Check if post is published and publication date is today or earlier
			const publishDate = new Date(post.published);
			publishDate.setHours(0, 0, 0, 0);

			if (post.published && publishDate <= today) {
				essays.push(post);
			}
		}
	}

	essays = essays.sort(
		(first, second) => new Date(second.published).getTime() - new Date(first.published).getTime()
	);

	return essays;
}

export interface Essay {
	title: string;
	slug: string;
	generatedSlug: string;
	excerpt: string;
	coverImage: string;
	coverWidth: number;
	coverHeight: number;
	published: string;
	updated?: string;
	categories: string[];
}
