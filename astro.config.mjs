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
          label: 'Stories',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Args', slug: 'stories/args' },
            { label: 'Parameters', slug: 'stories/parameters' },
            { label: 'Decorators', slug: 'stories/decorators' },
            { label: 'Play function', slug: 'stories/playfunction' },
            { label: 'Loaders', slug: 'stories/loaders' },
            { label: 'Tags', slug: 'stories/tags' },
          ],
        },
        {
          label: 'Docs',
          autogenerate: { directory: 'docs' },
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
