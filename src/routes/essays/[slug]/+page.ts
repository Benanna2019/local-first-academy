import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	if (params.slug === 'sync') {
		redirect(302, '/essays/sync-web-apps-made-simple');
	}
	try {
		const post = await import(`../../../lib/content/essays/${params.slug}.md`);

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.slug }
		};
	} catch (err) {
		error(404, String(err));
	}
};
