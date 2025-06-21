import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Chemary',
  tagline: '化学分野の最新情報を一箇所で',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://chemary-docs.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'clameyes', // Usually your GitHub org/user name.
  projectName: 'chemary-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/clameyes/chemary-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Chemary',
      logo: {
        alt: 'Chemary Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'ユーザーガイド',
        },
        {
          href: 'https://github.com/clameyes/chemary-docs/issues',
          label: 'Issues',
          position: 'right',
        },
        {
          href: 'https://github.com/clameyes/chemary-docs/discussions',
          label: 'Discussions',
          position: 'right',
        },
        {
          href: 'https://github.com/clameyes/chemary-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'ユーザーガイド',
          items: [
            {
              label: '概要',
              to: '/docs/overview',
            },
            {
              label: 'はじめる',
              to: '/docs/tutorial/browser-access',
            },
            {
              label: '使い方',
              to: '/docs/how-to/daily-check',
            },
          ],
        },
        {
          title: 'コミュニティ',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/clameyes/chemary-docs/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/clameyes/chemary-docs/discussions',
            },
          ],
        },
        {
          title: 'リンク',
          items: [
            {
              label: 'Chemary (本体)',
              href: 'https://chemary.app',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/clameyes/chemary-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Chemary Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
