import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkMermaid } from './plugins/remark-mermaid.mjs';

export default defineConfig({
  site: 'https://libertaria.app',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
    remarkPlugins: [remarkMermaid, remarkMath],
    rehypePlugins: [] // KaTeX disabled
  }
});
