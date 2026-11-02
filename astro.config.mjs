// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nicolasmilosevic.com',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
