// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",

  integrations: [
    mdx(),
    sitemap(),
    react(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: node({
    mode: "standalone",
  }),
});