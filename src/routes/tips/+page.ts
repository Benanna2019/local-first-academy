import { error } from '@sveltejs/kit';

export const load = async () => {
	try {
		const tips = await getTips();
		return {
			tips
		};
	} catch (err) {
		error(404, String(err));
	}
};

async function getTips() {
	let tips: Tip[] = [];

	const paths = import.meta.glob('/src/lib/content/tips/*.(md)', { eager: true });

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Tip;
			const post = { ...metadata, generatedSlug: slug } satisfies Tip;

			// Check if post is published and publication date is today or earlier
			const publishDate = new Date(post.published);
			publishDate.setHours(0, 0, 0, 0);

			if (post.published && publishDate <= today) {
				tips.push(post);
			}
		}
	}

	tips = tips.sort(
		(first, second) => new Date(second.published).getTime() - new Date(first.published).getTime()
	);

	return tips;
}

export interface Tip {
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
