import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGithub from 'remark-github';
import remarkGfm from 'remark-gfm';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const mdsvexConfig = {
	extensions: ['.svelte.md', '.md', '.svx'],
	// layout: {
	// 	_: './src/mdsvexlayout.svelte' // default mdsvex layout
	// },
	remarkPlugins: [
		[
			remarkGfm,
			{
				// Use your own repository
				repository: 'https://github.com/Benanna2019/local-first-academy'
			}
		],
		[remarkGithub, { repository: 'https://github.com/Benanna2019/local-first-academy/' }],
		remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.html', '.svx', ...mdsvexConfig.extensions],
	preprocess: [
		vitePreprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@/*': './src/*'
		}
	}
};

export default config;
