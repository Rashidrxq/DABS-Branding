function initMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinksContainer = document.querySelector('.nav-links');
    const closeIcon = document.querySelector('.sidebar-logo .bx-x');

    if (!menuIcon || !navLinksContainer) return;

    const open = () => navLinksContainer.classList.add('active');
    const close = () => navLinksContainer.classList.remove('active');

    menuIcon.addEventListener('click', open);
    if (closeIcon) closeIcon.addEventListener('click', close);

    // Close menu when clicking a link without submenu
    navLinksContainer.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        const li = e.target.closest('li');
        if (a && !li?.querySelector('.sub-menu')) close();
    });

    // Handle submenu toggles
    navLinksContainer.querySelectorAll('.links > li').forEach((li) => {
        const arrow = li.querySelector('.arrow');
        const submenuToggle = li.querySelector('a[aria-haspopup="true"]');
        const subMenu = li.querySelector('.sub-menu');
        if (!subMenu) return;

        if (arrow) {
            arrow.addEventListener('click', (e) => {
                e.preventDefault(); e.stopPropagation();
                if (window.innerWidth <= 992) li.classList.toggle('active-submenu');
            });
        }

        if (submenuToggle) {
            submenuToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) { e.preventDefault(); li.classList.toggle('active-submenu'); }
            });
        }

        subMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { if (window.innerWidth <= 992) close(); });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {};
            const fields = ['name','email','phone','subject','message'];
            fields.forEach(f => { const el = document.getElementById(f); formData[f] = el ? el.value : ''; });
            console.log('Form submitted:', formData);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
