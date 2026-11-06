import { buildCollections } from './collectionData';
export const SITE_URL = 'https://www.hrgprefab.com';
const rows = [
  ['/', 'Prefab ADUs, Additions & Building Materials', 'Plan your prefab ADU or addition with HRG Prefab. Explore floor plans, compare materials-only and coordinated project scopes, and estimate your budget.'],
  ['/about', 'About HRG Prefab', 'Meet HRG Prefab and learn how we coordinate design, permitting and prefabricated building materials for ADUs and additions.'],
  ['/services', 'Prefab ADU Design, Permits & Materials', 'Explore HRG services for detached ADUs and additions, from feasibility and design to permitting, prefab materials and installation coordination.'],
  ['/projects', 'Prefab ADU & Addition Projects', 'Explore HRG prefab project examples and design ideas for backyard living spaces and additions. Start planning what fits your property.'],
  ['/testimonials', 'Client Testimonials', 'Read client feedback about working with HRG Prefab and explore the next steps for your ADU or addition project.'],
  ['/contact', 'Contact HRG Prefab', 'Talk with HRG about your property, prefab ADU plans, materials package or project scope. Call 909.274.0272 or send your project details.'],
  ['/see-what-fits', 'Check Your Property for a Prefab ADU', 'Share your property and project goals with HRG Prefab to review fit, site requirements and the next steps toward a project budget.'],
  ['/adu-models', '500 & 800 Sq Ft ADU Floor Plans', 'Compare HRG 500 and 800 square foot ADU plans, layouts and options. Review one- and two-bedroom starting points for your property.'],
  ['/compare-500-800', 'Compare 500 vs 800 Sq Ft ADU Plans', 'Compare the space, bedrooms and layout of HRG 500 and 800 square foot ADUs, then review your lot and budget with our team.'],
  ['/how-it-works', 'How a Prefab ADU Project Works', 'Understand the HRG prefab process, from property review and design through approvals, manufacturing, delivery and coordinated on-site assembly.'],
  ['/financing', 'Explore ADU & Addition Financing', 'Explore financing options for your ADU or home addition and connect with lending partners. Eligibility, approval and terms are determined by the lender.'],
  ['/collection', 'Prefab Homes, Cabins & Outdoor Kitchens', 'Explore HRG prefab floor plans, Apple Cabins, expandable containers and outdoor kitchens. Compare layouts and plan your project scope.'],
  ['/best-sellers', 'Popular Prefab ADU Floor Plans', 'Explore popular HRG prefab plans, compare sizes and layouts, and review materials pricing and project requirements.'],
  ['/finishes', 'Prefab Home Finish Selections', 'Explore HRG interior and exterior finishes, compare options and build a selection package for your prefab home or ADU.'],
  ['/pools', 'Prefab Pool Collection & Backyard Designs', 'Explore HRG pool models, dimensions, equipment and backyard design options. Request a quote for your selected pool and property.'],
  ['/why-hrg', 'Why Choose HRG Prefab', 'Learn about the HRG approach to prefab building materials, project planning and coordination for ADUs, additions and homes.'],
  ['/references', 'HRG Project References & Our Work', 'Browse HRG project references and examples of prefab construction, then discuss your property and scope with our team.'],
  ['/project-builder', 'Prefab ADU Project Budget Builder', 'Choose your property, size and scope to estimate a prefab project budget. Separate building materials, site work and optional services.'],
  ['/faq', 'Prefab ADU Costs, Permits & Project FAQs', 'Get clear answers about prefab ADU materials pricing, permits, contractors, project timelines, financing and what fits on your property.'],
  ['/privacy-policy', 'Privacy Policy', 'Read the HRG Prefab privacy policy and how information submitted through our website is handled.'],
  ['/terms-conditions', 'Terms & Conditions', 'Read the terms and conditions for using the HRG Prefab website and its project planning tools.'],
];
export const seoPages = Object.fromEntries(rows.map(([path, title, description]) => [path, { title: `${title} | HRG Prefab`, description }]));
for (const collection of Object.values(buildCollections)) {
  const path = `/collection/${collection.slug}`;
  seoPages[path] = { title: `${collection.name} Collection | HRG Prefab`, description: `${collection.tagline} Explore models, specifications and options with HRG Prefab.` };
  for (const model of collection.models) {
    const modelPath = `${path}/${model.slug}`;
    seoPages[modelPath] = {
      title: `${model.id ? model.id + ' ' : ''}${model.name} | HRG Prefab`,
      description: `Explore the ${model.name}${model.sf ? `, a ${model.sf.toLocaleString('en-US')} sq ft floor plan` : ''} in HRG's ${collection.name} collection. View specifications and discuss property fit and project scope.`,
      image: model.photo || model.img,
    };
    if (collection.buildable) seoPages[`${modelPath}/build`] = { title: `Configure ${model.id} Finishes | HRG Prefab`, description: `Choose finishes and options for the ${model.name} and review your planning estimate.`, canonicalPath: modelPath, noindex: true };
  }
}
export function pageSeo(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const page = seoPages[path];
  return { ...(page || { title: 'Page Not Found | HRG Prefab', description: 'Find prefab ADU plans, materials and project information at HRG Prefab.', noindex: true }), path, url: SITE_URL + (page?.canonicalPath || path), image: page?.image || `${SITE_URL}/assets/hero.webp` };
}
export function structuredData(page) {
  const organization = { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'HRG Prefab', url: `${SITE_URL}/`, logo: `${SITE_URL}/assets/logo-01-sm.png`, telephone: '+1-909-274-0272', email: 'sales@hrgprefab.com' };
  const graph = [organization, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'HRG Prefab', url: `${SITE_URL}/`, publisher: { '@id': organization['@id'] } }, { '@type': 'WebPage', '@id': `${page.url}#webpage`, url: page.url, name: page.title, description: page.description, isPartOf: { '@id': `${SITE_URL}/#website` } }];
  if (page.path !== '/' && !page.noindex) graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }, { '@type': 'ListItem', position: 2, name: page.title.replace(' | HRG Prefab', ''), item: page.url }] });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export const robotsFor = page => page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large';
