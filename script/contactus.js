function initMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navLinksContainer = document.querySelector('.nav-links');
    const closeIcon = document.querySelector('.sidebar-logo .bx-x');
  
    if (!menuIcon || !navLinksContainer) return;
  
    const open = () => navLinksContainer.classList.add('active');
    const close = () => navLinksContainer.classList.remove('active');
  
    menuIcon.addEventListener('click', open);
    
    if (closeIcon) {
        closeIcon.addEventListener('click', close);
    }
  
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
                    close();
                }
            });
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
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to your server
            console.log('Form submitted:', formData);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Clear form
            contactForm.reset();
        });
    }
});
