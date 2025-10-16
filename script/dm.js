document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initShareSheet();
  initScrollAnimations();
  initSmoothScrolling();
});

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

function initShareSheet() {
  // Get all share icons
  const shareIcons = document.querySelectorAll('.share-icon');
  // Get the share sheet modal
  const shareSheet = document.getElementById('shareSheet');
  // Get the close button
  const closeBtn = document.querySelector('.close-share-sheet');
  
  // Show share sheet when share icon is clicked
  shareIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      const url = icon.getAttribute('data-url');
      const title = icon.getAttribute('data-title');
      
      // Store the URL and title in the share sheet for later use
      shareSheet.setAttribute('data-url', url);
      shareSheet.setAttribute('data-title', title);
      
      // Show the share sheet
      shareSheet.classList.add('active');
    });
  });
  
  // Close share sheet when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      shareSheet.classList.remove('active');
    });
  }
  
  // Close share sheet when clicking outside the content
  shareSheet.addEventListener('click', (e) => {
    if (e.target === shareSheet) {
      shareSheet.classList.remove('active');
    }
  });
  
  // Handle share option clicks
  const shareOptions = document.querySelectorAll('.share-option');
  shareOptions.forEach(option => {
    option.addEventListener('click', () => {
      const platform = option.getAttribute('data-platform');
      const url = shareSheet.getAttribute('data-url');
      const title = shareSheet.getAttribute('data-title');
      
      shareToPlatform(platform, url, title);
      
      // Close the share sheet after sharing
      shareSheet.classList.remove('active');
    });
  });
}

function initScrollAnimations() {
  // Get all timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
      rect.bottom >= 0
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    timelineItems.forEach((item, index) => {
      if (isInViewport(item)) {
        // Add delay based on index for staggered animation
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 200);
      }
    });
  }
  
  // Initial check in case items are already in viewport
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
}

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

function shareToPlatform(platform, url, title) {
  switch(platform) {
    case 'instagram':
      // Instagram sharing is typically done through native apps
      // We'll just copy the link for Instagram
      copyToClipboard(url);
      alert('Link copied! You can now paste it in Instagram.');
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
      break;
    case 'whatsapp':
      window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
      break;
    case 'copy':
      copyToClipboard(url);
      alert('Link copied to clipboard!');
      break;
    default:
      copyToClipboard(url);
      alert('Link copied to clipboard!');
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(text);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}