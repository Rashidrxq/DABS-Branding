



// Parallax chips follow mouse slightly
(function(){
  const hero = document.getElementById('hero');
  if(!hero) return;
  let raf = null;
  function onMove(e){
    const r = hero.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width/2)); // center‑based
    const my = (e.clientY - (r.top + r.height/2));
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(()=> {
      hero.style.setProperty('--mx', mx.toFixed(1)+'px');
      hero.style.setProperty('--my', my.toFixed(1)+'px');
    });
  }
  hero.addEventListener('mousemove', onMove);
  hero.addEventListener('mouseleave', ()=> {
    hero.style.setProperty('--mx','0px'); hero.style.setProperty('--my','0px');
  });
})();





