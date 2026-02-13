import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://libertaria.app',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
