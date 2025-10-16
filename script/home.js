document.addEventListener('DOMContentLoaded', () => {
  initTeamInfoCard();
  initMobileMenu();
  initCoursesAutoScroll();
  initReturnToTop();
});

function initTeamInfoCard() {
  const markers = document.querySelectorAll('.team-marker');
  const card = document.getElementById('team-info-card');
  if (!card || !markers.length) return;

  const img = document.getElementById('card-img');
  const nameEl = document.getElementById('card-name');
  const roleEl = document.getElementById('card-role');

  let hideTimer;

  const show = (marker) => {
    clearTimeout(hideTimer);
    const name = marker.getAttribute('data-name') || '';
    const role = marker.getAttribute('data-role') || '';
    const imgUrl = marker.getAttribute('data-img') || '';
    if (img) img.src = imgUrl;
    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.textContent = role;
    card.classList.add('active');
  };

  const hide = () => card.classList.remove('active');

  markers.forEach((m) => {
    m.addEventListener('click', () => show(m));
    m.addEventListener('mouseenter', () => show(m));
    m.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(hide, 250);
    });
  });

  card.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  card.addEventListener('mouseleave', hide);
}

function initMobileMenu() {
  const menuIcon = document.getElementById('menu-icon');
  const navLinksContainer = document.querySelector('.nav-links');
  const closeIcon = document.querySelector('.sidebar-logo .bx-x');

  if (!menuIcon || !navLinksContainer || !closeIcon) return;

  const open = () => navLinksContainer.classList.add('active');
  const close = () => navLinksContainer.classList.remove('active');

  menuIcon.addEventListener('click', open);
  closeIcon.addEventListener('click', close);

  navLinksContainer.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) close();
  });

  navLinksContainer.querySelectorAll('.links > li').forEach((li) => {
    const hasSub = li.querySelector('.sub-menu');
    if (!hasSub) return;
    li.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        li.classList.toggle('active-submenu');
      }
    });
  });
}

function initCoursesAutoScroll() {
  const grid = document.querySelector('.courses-grid');
  if (!grid) return;

  if (!grid.dataset.duplicated) {
    grid.innerHTML += grid.innerHTML;
    grid.dataset.duplicated = 'true';
  }

  let rafId = null;
  let paused = false;
  let isPointerDown = false;
  let startX = 0;
  let startScroll = 0;
  let lastUserAction = 0;
  const speed = 0.4;
  const pauseAfterAction = 1200;
  const half = () => grid.scrollWidth / 2;

  const loop = () => {
    if (!paused && !isPointerDown) {
      grid.scrollLeft += speed;
      if (grid.scrollLeft >= half()) grid.scrollLeft -= half();
    }
    if (Date.now() - lastUserAction > pauseAfterAction && !isPointerDown) paused = false;
    rafId = requestAnimationFrame(loop);
  };

  const pause = () => { paused = true; lastUserAction = Date.now(); };

  grid.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    startX = e.clientX;
    startScroll = grid.scrollLeft;
    pause();
    try { grid.setPointerCapture(e.pointerId); } catch {}
  });
  grid.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const dx = e.clientX - startX;
    grid.scrollLeft = startScroll - dx;
  });
  const endPointer = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    lastUserAction = Date.now();
    try { grid.releasePointerCapture(e.pointerId); } catch {}
  };
  grid.addEventListener('pointerup', endPointer);
  grid.addEventListener('pointercancel', endPointer);

  grid.addEventListener('mouseenter', pause);
  grid.addEventListener('mouseleave', () => { lastUserAction = Date.now(); });
  grid.addEventListener('wheel', () => pause(), { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      loop();
    }
  });

  if (!rafId) loop();
}

function initReturnToTop() {
  const btn = document.getElementById('return-to-top');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// Reusable auto scroller for any horizontal container
function initAutoScroller(selector, { speed = 0.5, pauseAfterAction = 1200 } = {}) {
  const row = document.querySelector(selector);
  if (!row) return;

  // Duplicate children once to create an infinite loop illusion
  if (!row.dataset.duplicated) {
    row.innerHTML += row.innerHTML;
    row.dataset.duplicated = 'true';
  }

  let rafId = null;
  let paused = false;
  let isPointerDown = false;
  let startX = 0;
  let startScroll = 0;
  let lastUserAction = 0;

  const halfWidth = () => row.scrollWidth / 2;

  const loop = () => {
    if (!paused && !isPointerDown) {
      row.scrollLeft += speed;
      if (row.scrollLeft >= halfWidth()) row.scrollLeft -= halfWidth();
    }
    if (Date.now() - lastUserAction > pauseAfterAction && !isPointerDown) paused = false;
    rafId = requestAnimationFrame(loop);
  };

  const pause = () => { paused = true; lastUserAction = Date.now(); };

  // Drag with pointer events
  row.addEventListener('pointerdown', (e) => {
    isPointerDown = true;
    startX = e.clientX;
    startScroll = row.scrollLeft;
    pause();
    try { row.setPointerCapture(e.pointerId); } catch {}
  });
  row.addEventListener('pointermove', (e) => {
    if (!isPointerDown) return;
    const dx = e.clientX - startX;
    row.scrollLeft = startScroll - dx;
  });
  const end = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    lastUserAction = Date.now();
    try { row.releasePointerCapture(e.pointerId); } catch {}
  };
  row.addEventListener('pointerup', end);
  row.addEventListener('pointercancel', end);

  // Pause on hover/wheel/touch
  row.addEventListener('mouseenter', pause);
  row.addEventListener('mouseleave', () => { lastUserAction = Date.now(); });
  row.addEventListener('wheel', () => pause(), { passive: true });

  // Visibility handling
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      loop();
    }
  });

  // Start
  if (!rafId) loop();
}

// Call it for your rows
document.addEventListener('DOMContentLoaded', () => {
  // Auto-move placement fashion cards
  initAutoScroller('.fashion-cards', { speed: 0.6, pauseAfterAction: 1200 });

  // If you also want courses to move, enable this:
  // initAutoScroller('.courses-grid', { speed: 0.4, pauseAfterAction: 1200 });
});


document.addEventListener('DOMContentLoaded', () => {
    const circularGallery = document.querySelector('.circular-gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const numItems = galleryItems.length;
    const angleIncrement = 360 / numItems; // Angle between each item

    galleryItems.forEach((item, index) => {
        // Calculate the rotation angle for each item to place it around the circle
        const rotationAngle = index * angleIncrement;
        item.style.setProperty('--rotation-angle', `${rotationAngle}deg`);
        // The transform property in CSS will then use this custom property
        // to position and rotate the item.
    });

    // Optional: Add hover effect to pause rotation (if desired)
    // circularGallery.addEventListener('mouseenter', () => {
    //     circularGallery.style.animationPlayState = 'paused';
    // });

    // circularGallery.addEventListener('mouseleave', () => {
    //     circularGallery.style.animationPlayState = 'running';
    // });
});



