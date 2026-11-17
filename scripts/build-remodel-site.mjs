// GENERATED SITE: every HTML page in sites/remodel (thehomeremodelgroup.com) is written by this script.
// Edit the pages here, not the HTML, then run `npm run build:remodel` and commit the regenerated files.
// Vercel serves sites/remodel as-is with no build step, so the script only runs locally.
// Keep it short: every page = photo, a few key points, one lead form.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const SITE=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../sites/remodel');
const PLAN='https://estimate.thehomeremodelgroup.com/estimate';
const U=(id,w)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
const img=(id,alt,{w=800,h=533,eager=false,cls=''}={})=>`<img${cls?` class="${cls}"`:''} src="${U(id,w)}" srcset="${U(id,Math.round(w/2))} ${Math.round(w/2)}w, ${U(id,w)} ${w}w, ${U(id,w*2)} ${w*2}w" sizes="(max-width:760px) 100vw, ${w}px" width="${w}" height="${h}" alt="${alt}"${eager?' fetchpriority="high"':' loading="lazy"'} decoding="async">`;
const P={hero:'1565183928294-7063f23ce0f8',kitchen:'1601760561441-16420502c7e0',kitchen2:'1565538810643-b5bdb714032a',bath:'1584622650111-993a426fbf0a',bath2:'1587527901949-ab0341697c1e',
 adu:'1628394029761-acc83a2a08a6',home:'1600585154340-be6161a56a0c',exterior:'1580587771525-78b9dba3b914',plans:'1762146828422-50a8bd416d3c',reno:'1618832515490-e181c4794a45',
 hire:'1772442198624-4fc4d7281e89',budget:'1724304406928-c43b01912fa1',team:'1632862378103-8248dccb7e3d',framing:'1646324554833-f0b6a479fa5d',interior:'1600607687920-4e2a09cf159d'};
const PROJECTS=['Kitchen','Bathroom','Room addition','ADU or garage conversion','Whole-home remodel','Roof or exterior','Something else'];

const MARK=`<span class="wm-mark"><svg viewBox="0 0 46 12" aria-hidden="true"><path d="M1 11 23 1.5 45 11" fill="none" stroke="currentColor" stroke-width="2"/></svg><span class="wm-hrg">HRG</span></span><span class="wm-sub">The Home Remodel Group</span>`;
const NAV=[['/#projects','Projects'],['/guides','Guides'],[PLAN,'Cost planner'],['/about','About'],['/contact','Contact']];
const header=cur=>`<div class="topbar"><div class="wrap"><p>Free estimates for kitchens, baths, additions and ADUs.</p>
  <div class="tb-links"><a href="tel:+12132164416">213.216.4416</a><a href="mailto:sales@hrgprefab.com">sales@hrgprefab.com</a></div></div></div>
<header class="navbar"><div class="wrap">
  <a class="wm" href="/" aria-label="The Home Remodel Group, home">${MARK}</a>
  <nav class="mainnav" id="mainnav" aria-label="Main">${NAV.map(([h,t])=>`<a href="${h}"${h===cur?' aria-current="page"':''}>${t}</a>`).join('')}</nav>
  <div class="nav-tools">
    <button type="button" class="iconbtn" id="theme-btn" aria-label="Dark mode" aria-pressed="false"></button>
    <button type="button" class="iconbtn menubtn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="mainnav"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    <a class="btn nav-cta" href="#estimate">Free estimate</a>
  </div>
</div></header>`;
const footer=`<footer class="foot"><div class="wrap">
  <div class="cols">
    <div><a class="wm" href="/" aria-label="The Home Remodel Group, home">${MARK}</a><p>Remodeling with a clear price and a plan.</p></div>
    <div><h4>Explore</h4><ul><li><a href="/#projects">Projects</a></li><li><a href="/guides">Guides</a></li><li><a href="${PLAN}">Cost planner</a></li><li><a href="https://www.hrgprefab.com/">HRG Prefab</a></li></ul></div>
    <div><h4>Talk to HRG</h4><ul><li><a href="tel:+12132164416">213.216.4416</a></li><li><a href="mailto:sales@hrgprefab.com">sales@hrgprefab.com</a></li><li>Mon to Fri, 8am to 5pm</li><li><a href="/contact">Contact</a></li></ul></div>
  </div>
  <div class="legal"><p>Guides are general information, not legal or engineering advice. Rules vary by state and city.</p><p>© <span id="yr">2026</span> The Home Remodel Group</p></div>
</div></footer>
<div class="mcta"><a class="btn" href="#estimate">Get a free estimate</a><a class="btn light" href="tel:+12132164416" aria-label="Call HRG">Call</a></div>`;
const form=(title='Get your free estimate',def='')=>`<form class="lead" id="estimate" novalidate${def?` data-default="${def}"`:''}>
  <h2>${title}</h2><p class="sub">Free and no obligation. We'll call to set up a visit.</p>
  <label>Name<input name="name" autocomplete="name" required></label>
  <div class="row"><label>Phone<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label><label>ZIP code<input name="zip" autocomplete="postal-code" inputmode="numeric" maxlength="10"></label></div>
  <label>Email<input name="email" type="email" autocomplete="email" required></label>
  <label>Project<select name="project">${PROJECTS.map(p=>`<option>${p}</option>`).join('')}</select></label>
  <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
  <p class="err" role="alert" hidden></p>
  <button class="btn" type="submit">Get my free estimate</button>
  <p class="fine">By sending, you agree HRG may contact you about your project.</p>
</form>`;
const formBand=(h,sub,def)=>`<section class="sec form-sec"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Free estimate</p><h2>${h}</h2><p class="lede">${sub}</p>
    <ul class="ticks" style="color:var(--fg)"><li>Written scope and price</li><li>Permits handled</li><li>One point of contact</li></ul></div>
  ${form('Tell us about your project',def)}
</div></section>`;

function page({out,url,nav='',title,desc,body,ld,noindex}){
  const full=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
${noindex?'<meta name="robots" content="noindex">':`<link rel="canonical" href="https://thehomeremodelgroup.com${url}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Home Remodel Group">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://thehomeremodelgroup.com${url}">
<meta property="og:image" content="${U(P.hero,1200)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#1a1a1a">
<script>try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap">
<link rel="stylesheet" href="/assets/site.css">${ld?`\n<script type="application/ld+json">${JSON.stringify(ld)}</script>`:''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(nav)}
<main id="main">
${body.trim()}
</main>
${footer}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
  fs.mkdirSync(path.dirname(SITE+out),{recursive:true});fs.writeFileSync(SITE+out,full);
  const words=body.replace(/<[^>]+>/g,' ').split(/\s+/).filter(w=>/[a-z]/i.test(w)).length;console.log(out.padEnd(34),words,'words')}

/* ---------- guides ---------- */
const G=[
 {slug:'remodel-process',tag:'How it works',name:'How a remodel works',card:'Five stages from first call to final inspection.',photo:P.reno,alt:'Kitchen mid-remodel with cabinets covered for protection',
  h1:'How a remodel <em>works</em>',lede:'Five stages, from first call to final inspection.',def:'Something else',job:'',
  facts:[['A bathroom','3 to 8 weeks of work'],['A kitchen','6 to 12 weeks of work'],['Hold back','10 to 15% for surprises']],
  points:[['Plan and price.','Decide what has to change and get a price range.'],['Design.','Drawings only when walls, plumbing or the footprint change. Pick finishes early.'],['Permits.','Simple work is often approved the same day. Additions take weeks of plan review.'],['Build and inspect.','Demolition, rough-in, inspection, drywall, then finishes.'],['Final walkthrough.','Final inspection, punch list, lien waivers and warranties.']]},
 {slug:'kitchen-remodel',tag:'Kitchens',name:'Kitchen remodel',card:'Layout, cabinets and counters drive the cost.',photo:P.kitchen,alt:'Remodeled white kitchen with farmhouse sink and pendant light',
  h1:'Planning a <em>kitchen</em> remodel',lede:'What drives the cost and how to keep the project on schedule.',def:'Kitchen',job:'kitchen',
  facts:[['Construction','6 to 12 weeks'],['Permit','When you move plumbing, gas, walls or add circuits'],['Biggest costs','Cabinets, counters and layout changes']],
  points:[['Keep the layout','if you can. Moving the sink or range adds plumbing, gas and permit work.'],['Cabinets','are usually the largest cost. Paint or reface sound boxes instead of replacing them.'],['Counters:','quartz is low-maintenance, granite and quartzite are natural stone, laminate costs least.'],['Plan circuits early.','Induction ranges and new appliances often need their own circuits.'],['Order early.','Get cabinets and appliances ordered before demolition, and set up a temporary kitchen.']]},
 {slug:'bathroom-remodel',tag:'Bathrooms',name:'Bathroom remodel',card:'Waterproofing is what makes a bathroom last.',photo:P.bath,alt:'Modern bathroom with glass shower and vanity',
  h1:'Planning a <em>bathroom</em> remodel',lede:'Spend on what you can\'t see, and keep fixtures where they are.',def:'Bathroom',job:'bathroom',
  facts:[['Construction','3 to 8 weeks'],['Permit','When fixtures move or wiring and plumbing change'],['Most important','Waterproofing behind the tile']],
  points:[['Waterproofing','behind the tile matters more than the tile you pick.'],['Keep fixtures in place','to save the most money.'],['Tub to shower','is the most requested change. A curbless shower helps you age in place.'],['Add blocking for grab bars','now, even if you install them later.'],['Vent the fan outside','and use GFCI outlets near water.']]},
 {slug:'adu',tag:'ADUs',name:'ADUs and garage conversions',card:'A second home on your lot, or more space inside it.',photo:P.adu,alt:'Small wood-sided backyard home among trees',
  h1:'ADUs and <em>garage conversions</em>',lede:'A rentable unit or space for family, on the lot you already own.',def:'ADU or garage conversion',job:'adu',
  facts:[['Start to finish','6 to 12 months, typically'],['Rules','Set by your state and city'],['Lowest cost path','Convert a garage or existing space']],
  points:[['Four types:','detached backyard home, attached unit, garage conversion, or a unit inside the house.'],['Check first:','zoning, size limits, setbacks, utilities, sewer or septic, and slope.'],['State laws help.','California, Oregon, Washington and other states make ADUs easier to permit.'],['Converting existing space','usually costs less and moves faster than building new.'],['Prefab can save time.','<a href="https://www.hrgprefab.com/">HRG Prefab</a> builds ADUs off-site and assembles them on your lot.']]},
 {slug:'permits',tag:'Permits',name:'Remodeling permits',card:'What needs one, who issues it and how long it takes.',photo:P.plans,alt:'Architectural plans spread on a table',
  h1:'Remodeling <em>permits</em>',lede:'What needs a permit, and how to get one without delays.',def:'Something else',job:'',
  facts:[['Who issues it','Your city or county building department'],['Simple work','Often approved the same day'],['Additions','Weeks of plan review']],
  points:[['Usually needs a permit:','new circuits, moving plumbing or gas, water heaters, re-roofs, structural work, HVAC, additions and ADUs.'],['Usually doesn\'t:','paint, flooring, cabinets in the same spot, like-for-like fixture swaps.'],['Your contractor','normally pulls the permit and books the inspections.'],['Skipping permits','can cause problems when you sell, insure or refinance.'],['Extra review','applies in historic districts, HOAs, and flood or wildfire zones.']]},
 {slug:'hiring-a-contractor',tag:'Hiring',name:'Hiring a contractor',card:'License, insurance, contract and payments.',photo:P.hire,alt:'Contractor reviewing building plans on site',
  h1:'How to hire a <em>contractor</em>',lede:'Five checks that protect you on any project.',def:'Something else',job:'',
  facts:[['Check','Your state\'s license lookup'],['Deposit','Keep it small'],['Always get','A written contract']],
  points:[['Look up the license','and complaints on your state licensing board\'s website.'],['Ask for insurance certificates','sent by the insurer: liability and workers\' comp.'],['Compare bids','on the same written scope.'],['Pay as work is done,','never far ahead. Some states cap deposits; California allows $1,000 or 10%, whichever is less.'],['Put changes in writing','before extra work starts, and collect lien waivers when you pay.']]},
 {slug:'budget-and-financing',tag:'Money',name:'Budget and financing',card:'Where the money goes and ways to pay.',photo:P.budget,alt:'House model, keys and calculator on a table',
  h1:'Budgeting for a <em>remodel</em>',lede:'Know the range, hold back a cushion, and pick how to pay.',def:'Something else',job:'#budget',
  facts:[['Cushion','10 to 15% for surprises'],['Biggest swing','Finish level and layout changes'],['Older homes','Test for lead and asbestos first']],
  points:[['Your budget covers','labor, materials, design, permits, cleanup and a contingency.'],['Finish level','(basic to luxury) moves the price more than anything but layout changes.'],['Homes built before 1978','need lead and asbestos testing before demolition.'],['Ways to pay:','cash, a HELOC, a home equity loan, a cash-out refinance, a personal loan or a renovation mortgage.'],['Check rebates','from your utility and state before you buy equipment.']]},
];
const planHref=g=>g.job.startsWith('#')?PLAN+g.job:g.job?`${PLAN}#job=${g.job}`:PLAN;
for(const g of G){
  const others=G.filter(x=>x!==g).slice(0,3);
  page({out:`/guides/${g.slug}.html`,url:`/guides/${g.slug}`,nav:'/guides',title:`${g.name} · The Home Remodel Group`,desc:`${g.lede} A short guide plus a free estimate.`,
   ld:{"@context":"https://schema.org","@type":"Article","headline":g.name,"publisher":{"@type":"Organization","name":"The Home Remodel Group","url":"https://thehomeremodelgroup.com/"},"dateModified":"2026-10-21","image":U(g.photo,1200)},
   body:`
<section class="photo-hero">${img(g.photo,'',{w:1600,h:900,eager:true})}<div class="wrap"><div>
  <p class="crumbs crumbs-light"><a href="/">Home</a> / <a href="/guides">Guides</a></p>
  <p class="eyebrow">${g.tag}</p><h1>${g.h1}</h1><p class="lede">${g.lede}</p>
  <div class="btns"><a class="btn" href="#estimate">Get a free estimate</a><a class="btn light" href="${planHref(g)}">See prices</a></div></div></div></section>
<div class="wrap"><div class="facts">${g.facts.map(([k,v])=>`<div class="fact"><span>${k}</span><b>${v}</b></div>`).join('')}</div>
<div class="keys"><div><h2>What to know</h2><ul class="points">${g.points.map(([b,t])=>`<li><span><b>${b}</b> ${t}</span></li>`).join('')}</ul>
  <div class="btns"><a class="btn" href="#estimate">Get a free estimate</a><a class="btn ghost" href="${planHref(g)}">Price it yourself</a></div></div>
  <figure>${img(g.photo===P.kitchen?P.kitchen2:g.photo===P.bath?P.bath2:g.photo===P.adu?P.home:P.framing,g.photo===P.kitchen?'Kitchen with quartz counters and brass faucet':g.photo===P.bath?'Bathroom with marble tile and glass shower':g.photo===P.adu?'Modern home with a large backyard':'Crew framing a new addition',{w:760,h:570})}</figure></div>
<p class="mini-links"><b>More guides:</b> ${others.map(o=>`<a href="/guides/${o.slug}">${o.name}</a>`).join(' ')}</p></div>
${formBand(`Ready to talk about your ${({Kitchens:'kitchen',Bathrooms:'bathroom',ADUs:'ADU'})[g.tag]||'project'}?`,'Tell us a little about it and we\'ll call you to set up a free estimate.',g.def)}`});
}

/* ---------- home ---------- */
const CARDS=[['Kitchens','Cabinets, counters, layout and lighting.',P.kitchen2,'Kitchen with quartz counters','Kitchen','/guides/kitchen-remodel'],
 ['Bathrooms','Showers, tubs, vanities and tile.',P.bath,'Modern bathroom with glass shower','Bathroom','/guides/bathroom-remodel'],
 ['Room additions','More bedrooms, bigger living space, second stories.',P.framing,'Crew framing an addition','Room addition',`${PLAN}#job=addition`],
 ['ADUs and garage conversions','A rentable unit or space for family.',P.adu,'Small backyard home','ADU or garage conversion','/guides/adu'],
 ['Whole-home remodels','Several rooms, planned as one project.',P.interior,'Open living room after a remodel','Whole-home remodel',`${PLAN}#job=whole`],
 ['Roofs and exteriors','Roofing, windows, siding and paint.',P.exterior,'Modern home exterior','Roof or exterior',`${PLAN}#job=roofing`]];
page({out:'/index.html',url:'/',title:'The Home Remodel Group · Remodeling with a clear price',desc:'Kitchens, bathrooms, additions and ADUs. Get a free estimate, or price your project yourself in two minutes.',
 ld:{"@context":"https://schema.org","@type":"HomeAndConstructionBusiness","name":"The Home Remodel Group (HRG)","url":"https://thehomeremodelgroup.com/","telephone":"+1-213-216-4416","email":"sales@hrgprefab.com","image":U(P.hero,1200),"sameAs":["https://www.hrgprefab.com/"]},
 body:`
<section class="photo-hero">${img(P.hero,'Bright remodeled kitchen with a large island',{w:1600,h:900,eager:true})}<div class="wrap">
  <div><p class="eyebrow">The Home Remodel Group</p><h1>Remodel with a <em>clear price</em> and a plan.</h1>
    <p class="lede">Kitchens, bathrooms, additions and ADUs. Tell us about your project and get a free estimate.</p>
    <ul class="ticks"><li>Written scope and price</li><li>Permits handled</li><li>One point of contact</li></ul></div>
  ${form()}
</div></section>

<section class="sec" id="projects"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Projects</p><h2>What are you <em>planning?</em></h2></div>
  <div class="pcards">${CARDS.map(([t,d,ph,alt,proj,more])=>`<div class="pcard">${img(ph,alt,{w:600,h:400})}<div class="pc-in"><h3>${t}</h3><p>${d}</p><div class="pc-acts"><a href="#estimate" data-project="${proj}">Free estimate</a><a class="muted" href="${more}">${more.startsWith('/guides')?'Learn more':'See prices'}</a></div></div></div>`).join('')}</div>
</div></section>

<section class="sec alt"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">How it works</p><h2>Three steps to <em>a finished room</em></h2></div>
  <ol class="steps3"><li><b>Tell us about it</b><span>Send the form or call. Takes two minutes.</span></li><li><b>Get a written price</b><span>We visit, measure and give you a clear scope.</span></li><li><b>We build it</b><span>Permits, inspections and cleanup included.</span></li></ol>
</div></section>

<section class="band"><div class="wrap">
  <div><h2>Want a number right now?</h2><p>Price your project yourself in about two minutes, for any U.S. state.</p></div>
  <a class="btn" href="${PLAN}">Open the cost planner</a>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Guides</p><h2>Know before you <em>build</em></h2></div>
  <div class="pcards">${[G[0],G[1],G[5]].map(g=>`<a class="pcard" href="/guides/${g.slug}">${img(g.photo,g.alt,{w:600,h:400})}<div class="pc-in"><h3>${g.name}</h3><p>${g.card}</p></div></a>`).join('')}</div>
  <p class="after"><a href="/guides">All guides</a></p>
</div></section>

<section class="band"><div class="wrap">
  <div><h2>Ready when you are.</h2><p>A free estimate, a written price, no obligation.</p></div>
  <div class="btns"><a class="btn" href="#estimate">Get a free estimate</a><a class="btn light" href="tel:+12132164416">Call 213.216.4416</a></div>
</div></section>`});

/* ---------- guides index ---------- */
page({out:'/guides/index.html',url:'/guides',nav:'/guides',title:'Remodeling guides · The Home Remodel Group',desc:'Short guides to kitchens, bathrooms, ADUs, permits, hiring and budgeting, each with a free estimate.',
 body:`
<section class="phero"><div class="wrap"><p class="crumbs"><a href="/">Home</a> / Guides</p><p class="eyebrow">Guides</p><h1>Know before you <em>build</em></h1><p class="lede">The important stuff, one page per topic.</p></div></section>
<section class="sec"><div class="wrap"><div class="pcards">${G.map(g=>`<a class="pcard" href="/guides/${g.slug}">${img(g.photo,g.alt,{w:600,h:400})}<div class="pc-in"><span class="tag">${g.tag}</span><h3>${g.name}</h3><p>${g.card}</p></div></a>`).join('')}</div></div></section>
${formBand('Skip the reading?','Tell us about your project and we\'ll call you with a free estimate.','')}`});

/* ---------- about ---------- */
page({out:'/about.html',url:'/about',nav:'/about',title:'About · The Home Remodel Group',desc:'The Home Remodel Group remodels kitchens, bathrooms, additions, ADUs and whole homes, with a written scope and price every time.',
 body:`
<section class="photo-hero">${img(P.team,'',{w:1600,h:900,eager:true})}<div class="wrap"><div>
  <p class="crumbs crumbs-light"><a href="/">Home</a> / About</p><p class="eyebrow">About HRG</p><h1>Remodeling, <em>done with a plan</em></h1>
  <p class="lede">We've spent years remodeling kitchens, baths, additions, ADUs and whole homes. HRG Prefab is our prefab division.</p></div></div></section>
<section class="sec"><div class="wrap"><ol class="steps3"><li><b>A written price</b><span>Every quote is built on a written scope you can compare.</span></li><li><b>Honest timelines</b><span>Permits and lead times included, and we tell you early if anything changes.</span></li><li><b>One point of contact</b><span>From the first visit to the final walkthrough.</span></li></ol></div></section>
${formBand('Let\'s talk about your project','Free estimate, no obligation.','')}`});

/* ---------- contact ---------- */
page({out:'/contact.html',url:'/contact',nav:'/contact',title:'Contact · The Home Remodel Group',desc:'Get a free estimate from The Home Remodel Group. Call 213.216.4416 or send the form.',
 body:`
<section class="sec form-sec"><div class="wrap">
  <div class="sec-head"><p class="eyebrow">Contact</p><h1 style="font-size:clamp(30px,4.4vw,46px)">Get your <em>free estimate</em></h1>
    <div class="contact-list"><p><span>Call</span><a href="tel:+12132164416">213.216.4416</a></p><p><span>Email</span><a href="mailto:sales@hrgprefab.com">sales@hrgprefab.com</a></p><p><span>Hours</span>Monday to Friday, 8am to 5pm</p></div></div>
  ${form('Tell us about your project')}
</div></section>`});

/* ---------- 404 ---------- */
page({out:'/404.html',url:'/404',noindex:true,title:'Page not found · The Home Remodel Group',desc:'This page does not exist.',
 body:`
<section class="phero"><div class="wrap"><p class="eyebrow">Page not found</p><h1>That page <em>moved</em></h1><div class="btns"><a class="btn" href="/">Go home</a><a class="btn ghost" href="/guides">Guides</a></div></div></section>
${formBand('Looking for an estimate?','Tell us about your project.','')}`});
