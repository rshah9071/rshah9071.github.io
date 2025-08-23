document.addEventListener('DOMContentLoaded', function() {
    // Function to smooth scroll to an element
    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // --- Handling Internal Page Navigation (e.g., from header) ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = this.getAttribute('href').substring(1);
            scrollToElement(targetId);
        });
    });

    // --- Handling Cross-Page Navigation with Scroll Intent ---

    // 1. Listen for clicks on buttons that intent to scroll after page load
    document.querySelectorAll('[data-scroll-to]').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-scroll-to');
            if (targetId) {
                sessionStorage.setItem('scrollToOnLoad', targetId);
                // Allow default navigation to the target page (index.html)
                // The scrolling will happen on the target page's DOMContentLoaded
            }
        });
    });

    // 2. On page load, check if a scroll intent was stored
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') { // Check if it's the main page
        const scrollTargetId = sessionStorage.getItem('scrollToOnLoad');
        if (scrollTargetId) {
            sessionStorage.removeItem('scrollToOnLoad'); // Clear the flag immediately

            // Add a small delay to ensure the content is rendered
            // before attempting to scroll. This is crucial for reliability.
            setTimeout(() => {
                scrollToElement(scrollTargetId);
            }, 150); // Increased delay slightly for better reliability
        }
    }
});