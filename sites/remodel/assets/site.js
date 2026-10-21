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

/* Lead form: posts to the same CRM route as the cost planner. If that fails, the visitor
   gets a ready-to-send email and a call button, so a lead is never silently lost. */
(function(){
  var API='https://www.hrgprefab.com/api/estimate-lead',MAIL='sales@hrgprefab.com',TEL='+12132164416';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  // "Free estimate" buttons on project cards pick the project, then jump to the form
  document.addEventListener('click',function(e){var a=e.target.closest('[data-project]');if(!a)return;
    var f=document.getElementById('estimate');if(!f)return;var s=f.querySelector('select[name=project]');
    if(s)s.value=a.getAttribute('data-project');});
  document.querySelectorAll('form.lead').forEach(function(f){
    var pre=f.getAttribute('data-default');if(pre){var s=f.querySelector('select[name=project]');if(s)s.value=pre}
    f.addEventListener('submit',function(e){e.preventDefault();
      var d={};new FormData(f).forEach(function(v,k){d[k]=String(v).trim()});
      var err=f.querySelector('.err');
      function fail(m){err.textContent=m;err.hidden=false}
      if(!d.name)return fail('Please add your name.');
      if((d.phone.match(/\d/g)||[]).length<10)return fail('Please add a 10-digit phone number.');
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))return fail('Please add a valid email.');
      err.hidden=true;var btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending...';
      var body={name:d.name,phone:d.phone,email:d.email,address:d.zip?('ZIP '+d.zip):'',jobs:d.project?[{job:d.project}]:[],
        notes:'Page: '+location.pathname,form:'thehomeremodelgroup.com lead form',source:'Website',consent:true,website:d.website||''};
      fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)})
        .then(function(r){return r.json().catch(function(){return{}}).then(function(j){return{ok:r.ok&&j.ok,status:r.status,j:j}})})
        .then(function(r){
          if(r.ok){f.className='lead done';f.innerHTML='<p class="big">Thanks, '+esc(d.name.split(' ')[0])+'.</p><p>We got your request and will call you to set up your free estimate.</p><a class="btn ghost" href="https://estimate.thehomeremodelgroup.com/estimate">See prices while you wait</a>';return}
          if(r.status===400&&r.j&&r.j.error){btn.disabled=false;btn.textContent='Get my free estimate';return fail(r.j.error)}
          throw new Error('send failed')})
        .catch(function(){
          var txt='Name: '+d.name+'\nPhone: '+d.phone+'\nEmail: '+d.email+'\nZIP: '+(d.zip||'-')+'\nProject: '+(d.project||'-');
          f.className='lead done';f.innerHTML='<p class="big">Almost there</p><p>Our form is having trouble. Send this as an email, or call us.</p><div class="alt">'+
            '<a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('Free estimate request')+'&body='+encodeURIComponent(txt)+'">Send by email</a>'+
            '<a class="btn ghost" href="tel:'+TEL+'">Call 213.216.4416</a></div>'});
    });
  });
})();
