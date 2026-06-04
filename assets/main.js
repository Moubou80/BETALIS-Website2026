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
