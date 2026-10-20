/* The Home Remodel Group: light/dark toggle, phone menu, footer year. No dependencies. */
(function(){
  var root=document.documentElement,mq=matchMedia('(prefers-color-scheme: dark)');
  var MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
      SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var tb=document.getElementById('theme-btn');
  function dark(){return root.dataset.theme?root.dataset.theme==='dark':mq.matches}
  function sync(){if(!tb)return;var d=dark();tb.setAttribute('aria-pressed',String(d));tb.innerHTML=d?SUN:MOON}
  if(tb){tb.addEventListener('click',function(){var d=!dark();root.dataset.theme=d?'dark':'light';try{localStorage.setItem('theme',d?'dark':'light')}catch(e){}sync()});
    (mq.addEventListener?mq.addEventListener('change',sync):mq.addListener(sync));sync()}
  var mb=document.getElementById('menu-btn'),nav=document.getElementById('mainnav');
  if(mb&&nav){mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',String(o))});
    nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')}})}
  var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
