// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain (public/CNAME) means no base path is needed.
// Until DNS is switched, the site is also reachable at
// https://<github-user>.github.io/leonkarsten-site/ — if you want that
// interim URL to work with correct asset paths, temporarily set
// `base: '/leonkarsten-site'` here and remove it when the domain goes live.
export default defineConfig({
  site: 'https://leonkarsten.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
