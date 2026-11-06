import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageSeo, robotsFor, structuredData } from '@/lib/seo';
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageSeo(pathname);
    document.title = page.title;
    const meta = (key, value, attribute = 'name') => {
      let node = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.appendChild(node); }
      node.content = value;
    };
    meta('description', page.description); meta('robots', robotsFor(page));
    for (const [key, value] of Object.entries({ title: page.title, description: page.description, url: page.url, image: page.image, type: 'website', site_name: 'HRG Prefab' })) meta(`og:${key}`, value, 'property');
    meta('twitter:card', 'summary_large_image'); meta('twitter:title', page.title); meta('twitter:description', page.description); meta('twitter:image', page.image);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = page.url;
    let schema = document.getElementById('page-schema');
    if (!schema) { schema = document.createElement('script'); schema.id = 'page-schema'; schema.type = 'application/ld+json'; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify(structuredData(page));
  }, [pathname]);
  return null;
}
