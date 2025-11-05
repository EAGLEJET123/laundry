 // Mobile Menu Toggle
    document.querySelector('.mobile-toggle').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.toggle('active');
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('.mobile-menu').classList.remove('active');
        }
    });
    
    // Add scrolling animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Function to scroll to an element
function scrollToElement(el_id) {
  // Get the element by its ID
  const el = document.getElementById(el_id);
  // Use scrollIntoView with smooth behavior
  el.scrollIntoView({
    behavior: "smooth"
  });
}

// Example: Call the function when a link is clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const el_id = this.getAttribute('href').substring(1);
    scrollToElement(el_id);
  });
});