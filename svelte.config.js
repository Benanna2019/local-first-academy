import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { bundledLanguages, getSingletonHighlighter } from 'shiki';

const mdsvexConfig = {
	extensions: ['.md'],
	layout: false,
	remarkPlugins: [],
	rehypePlugins: [],
	smartypants: false,
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await getSingletonHighlighter({
				themes: ['catppuccin-latte', 'github-dark'],
				langs: Object.keys(bundledLanguages)
			})
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark' }))
			const cleanedHtml = html.replace(/<span class="line">\s*/g, '<span class="line">');

			return `{@html \`${cleanedHtml.trim()} \`}`
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.html', ...mdsvexConfig.extensions],
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
