// Mobile Menu Functionality
const menuOpenBtn = document.querySelector("#menu-icon");
const menuCloseBtn = document.querySelector(".bx-x");
const navLinks = document.querySelector(".nav-links");

// When menu icon is clicked
menuOpenBtn.addEventListener("click", () => {
    navLinks.style.left = "0";
});

// When close icon is clicked
menuCloseBtn.addEventListener("click", () => {
    navLinks.style.left = "-100%";
});

// Handle submenu on mobile
let arrows = document.querySelectorAll(".arrow");
arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
        e.preventDefault();
        let arrowParent = arrow.parentElement;
        arrowParent.classList.toggle("showMenu");
    });
});

// Return to top button functionality
const returnToTopBtn = document.querySelector("#return-to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        returnToTopBtn.classList.add("show");
    } else {
        returnToTopBtn.classList.remove("show");
    }
});

returnToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Blog Section Interactivity
document.addEventListener('DOMContentLoaded', function() {
  // Add scroll animations to blog cards
  const blogCards = document.querySelectorAll('.blog-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  blogCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      if (email && validateEmail(email)) {
        // In a real implementation, you would send this to your server
        alert(`Thank you for subscribing with ${email}! You've been added to our newsletter.`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
  
  // Search functionality
  const searchInput = document.querySelector('.search-box input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const blogCards = document.querySelectorAll('.blog-card');
      
      blogCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Category filter
  const categoryFilter = document.querySelector('.category-filter select');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      const selectedCategory = this.value;
      const blogCards = document.querySelectorAll('.blog-card');
      
      if (selectedCategory === 'All Categories') {
        blogCards.forEach(card => {
          card.style.display = 'block';
        });
      } else {
        blogCards.forEach(card => {
          const categoryTag = card.querySelector('.category-tag').textContent;
          if (categoryTag === selectedCategory) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  }
});

// Email validation helper function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}