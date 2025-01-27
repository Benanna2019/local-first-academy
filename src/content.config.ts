import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
	loader: glob({ base: './src/content/essays', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date(),
		categories: z.array(z.string()),
		coverImage: z.string(),
		coverWidth: z.number(),
		coverHeight: z.number(),
		excerpt: z.string()
	})
});

export const collections = { essays };
