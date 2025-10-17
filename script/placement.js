
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
});

function initMobileMenu() {
  const menuIcon = document.getElementById('menu-icon');
  const navLinksContainer = document.querySelector('.nav-links');
  const closeIcon = document.querySelector('.sidebar-logo .bx-x');

  // Debug logging
  console.log('Menu icon:', menuIcon);
  console.log('Nav links container:', navLinksContainer);
  console.log('Close icon:', closeIcon);

  if (!menuIcon || !navLinksContainer || !closeIcon) {
    console.error('Missing required elements for mobile menu');
    return;
  }

  const open = () => navLinksContainer.classList.add('active');
  const close = () => navLinksContainer.classList.remove('active');

  menuIcon.addEventListener('click', open);
  closeIcon.addEventListener('click', close);

  // Close menu when clicking a link without submenu
  navLinksContainer.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    const li = e.target.closest('li');
    if (a && !li?.querySelector('.sub-menu')) {
      close();
    }
  });

  // Handle submenu toggles
  navLinksContainer.querySelectorAll('.links > li').forEach((li) => {
    const arrow = li.querySelector('.arrow');
    const submenuToggle = li.querySelector('a[aria-haspopup="true"]');
    const subMenu = li.querySelector('.sub-menu');
    
    if (!subMenu || !arrow) return;

    // Handle arrow click for toggling submenu
    arrow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (window.innerWidth <= 992) {
        li.classList.toggle('active-submenu');
      }
    });

    // Handle main link click
    if (submenuToggle) {
      submenuToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          li.classList.toggle('active-submenu');
        }
      });
    }

    // Allow submenu links to work normally
    subMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          close(); // Close mobile menu when clicking a submenu link
        }
      });
    });
  });
}