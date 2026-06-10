(function(){
  var nav = document.getElementById('nav');
  if(nav){
    window.addEventListener('scroll', function(){
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
  }
  var burger = document.getElementById('burger');
  var links = document.getElementById('navlinks');
  if(burger && links){
    burger.addEventListener('click', function(){
      links.classList.toggle('open');
    });
    // referme le menu après clic sur un lien (mobile)
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ links.classList.remove('open'); });
    });
  }
})();


/* === Consentement cookies (CNIL) === */
(function(){
  var KEY='betalis_consent', GA_ID='G-YKT3V80M25';
  function loadGA(){
    if(window.__betalisGA) return; window.__betalisGA=true;
    var s=document.createElement('script'); s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments);};
    gtag('js', new Date()); gtag('config', GA_ID);
  }
  function enableMaps(){
    document.querySelectorAll('iframe[data-src]').forEach(function(f){
      if(!f.src){ f.src=f.getAttribute('data-src'); f.style.display='block'; }
    });
    document.querySelectorAll('.map-consent').forEach(function(p){ p.style.display='none'; });
  }
  function hideBanner(){ var b=document.getElementById('cookieBanner'); if(b) b.remove(); }
  function grant(){ try{localStorage.setItem(KEY,'granted');}catch(e){} loadGA(); enableMaps(); hideBanner(); }
  function deny(){ try{localStorage.setItem(KEY,'denied');}catch(e){} hideBanner(); }
  function showBanner(){
    var b=document.createElement('div'); b.id='cookieBanner'; b.className='cookie-banner';
    b.innerHTML='<p>Nous utilisons des cookies de mesure d\'audience (Google Analytics) et d\'affichage de carte (Google Maps). Vous pouvez les accepter ou les refuser. Plus d\'infos dans notre <a href="/politique-confidentialite.html">politique de confidentialité</a>.</p>'
      +'<div class="cookie-actions"><button type="button" class="btn cookie-refuse" id="ckRefuse">Tout refuser</button><button type="button" class="btn btn-primary" id="ckAccept">Tout accepter</button></div>';
    document.body.appendChild(b);
    document.getElementById('ckAccept').addEventListener('click', grant);
    document.getElementById('ckRefuse').addEventListener('click', deny);
  }
  function init(){
    var c=null; try{c=localStorage.getItem(KEY);}catch(e){}
    if(c==='granted'){ loadGA(); enableMaps(); }
    else if(c!=='denied'){ showBanner(); }
    document.querySelectorAll('[data-map-load]').forEach(function(btn){
      btn.addEventListener('click', enableMaps);
    });
  }
  if(document.readyState!=='loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
