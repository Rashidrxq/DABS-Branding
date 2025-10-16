// Reveal on scroll for Courses page
(function(){
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
})();




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

// Modal handling for course cards
(function(){
  const modal = document.getElementById('course-modal');
  if(!modal) return;
  const title = document.getElementById('modal-title');
  const sub = document.getElementById('modal-sub');
  const duration = document.getElementById('modal-duration');
  const mode = document.getElementById('modal-mode');
  const desc = document.getElementById('modal-desc');
  const featuresList = document.getElementById('modal-features');

  function openFromCard(card){
    title.textContent = card.dataset.title || 'Course';
    sub.textContent = card.querySelector('.card-meta p')?.textContent || '';
    duration.textContent = card.dataset.duration || '-';
    mode.textContent = card.dataset.mode || '-';
    desc.textContent = card.dataset.description || '';
    featuresList.innerHTML = '';
    let feats = [];
    try { feats = JSON.parse(card.dataset.features || '[]'); } catch(e) {}
    feats.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresList.appendChild(li);
    });
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.course-trigger').forEach(tr => {
    tr.addEventListener('click', (e) => {
      e.preventDefault();
      const card = tr.closest('.course-card');
      if(card) openFromCard(card);
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) close();
  });
})();

// Add smooth scrolling functionality
document.addEventListener('DOMContentLoaded', function() {
  initSmoothScrolling();
});

function initSmoothScrolling() {
  // Handle anchor link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Check if it's an anchor link (starts with #)
      const href = this.getAttribute('href');
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        
        // Find the target element
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Scroll to the target element smoothly
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update the URL without reloading the page
          history.pushState(null, null, href);
        }
      }
    });
  });
}
