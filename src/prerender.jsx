import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import SiteRoutes from './SiteRoutes';
export { seoPages, pageSeo, structuredData, robotsFor, SITE_URL } from './lib/seo';
export function render(path) {
  const client = new QueryClient({ defaultOptions: { queries: { enabled: false } } });
  return renderToString(<QueryClientProvider client={client}><StaticRouter location={path}><MotionConfig reducedMotion="always"><SiteRoutes /></MotionConfig></StaticRouter></QueryClientProvider>);
}
