// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Storybook 日本語ガイド',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/H-Manny/try-ui-guideline' }],
      sidebar: [
        {
          label: 'Docs',
          autogenerate: { directory: 'docs' },
          // items: [
          //   // Each item here is one entry in the navigation menu.
          //   { label: 'Autodocs', slug: 'docs/autodocs' },
          //   { label: 'MDX', slug: 'docs/mdx' },
          //   { label: 'Doc blocks', slug: 'docs/doc-blocks' },
          //   { label: 'Code panel', slug: 'docs/code-panel' },
          // ],
        },
        // {
        //   label: 'Guides',
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: 'Example Guide', slug: 'guides/example' },
        //   ],
        // },
        // {
        //   label: 'Reference',
        //   autogenerate: { directory: 'reference' },
        // },
      ],
      lastUpdated: true,
    }),
  ],
});
