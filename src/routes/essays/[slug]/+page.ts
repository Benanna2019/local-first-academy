import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	console.log(params.slug);
	try {
		const post = await import(`../../../lib/content/essays/${params.slug}.svx`);
		console.log(post);

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.slug }
		};
	} catch (err) {
		error(404, String(err));
	}
};
