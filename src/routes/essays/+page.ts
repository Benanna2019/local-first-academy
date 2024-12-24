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

	const paths = import.meta.glob('/src/lib/content/essays/*.{svx,md}', { eager: true });

	console.log('paths', paths);

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.svx', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Essay;
			const post = { ...metadata, generatedSlug: slug } satisfies Essay;

			if (post.published) {
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
