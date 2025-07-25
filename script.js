document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('main-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const readMoreButtons = document.querySelectorAll('.read-more-btn'); // Select all read-more buttons

    const feedbackTriggerBtn = document.getElementById('feedback-trigger-btn');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeFeedbackModalBtn = document.getElementById('close-feedback-modal');

    // --- Sticky Header with Shrink Effect ---
    // This function adjusts header height and logo size on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) { // Adjust scroll threshold as needed
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    // Call once on load to set initial state if page is already scrolled
    handleScroll();

    // --- Mobile Navigation Toggle ---
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active'); // Toggle hamburger animation
        document.body.classList.toggle('no-scroll'); // Prevent scrolling when nav is open
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if the nav is active (i.e., it's the mobile menu)
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('#main-nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's an external link (like rehabilitation.html)
            if (this.getAttribute('href').startsWith('http') || this.getAttribute('href').endsWith('.html')) {
                return; // Let the browser handle external links normally
            }

            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset considering the sticky header
                // We need to get the current computed height of the header
                const currentHeaderHeight = mainHeader.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                // Add a little extra space (e.g., 20px) below the header so content isn't right at the edge
                const offsetPosition = elementPosition - currentHeaderHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Read More/Less functionality for sections (Rehab, Goshala, Old Age Home) ---
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.dataset.target; // Get the ID from data-target attribute
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                // Toggle the 'active' class which controls display and opacity
                targetContent.classList.toggle('active');

                // Update button text
                if (targetContent.classList.contains('active')) {
                    this.textContent = 'Show Less';
                } else {
                    this.textContent = this.dataset.originalText || 'Learn More'; // Use original text or default
                }
            }
        });
    });

    // Store original text for read more buttons on page load
    readMoreButtons.forEach(button => {
        button.dataset.originalText = button.textContent;
    });

    // --- Feedback Modal Logic ---
    feedbackTriggerBtn.addEventListener('click', () => {
        feedbackModal.classList.add('active'); // Show modal
        document.body.classList.add('no-scroll'); // Prevent body scroll
    });

    closeFeedbackModalBtn.addEventListener('click', () => {
        feedbackModal.classList.remove('active'); // Hide modal
        document.body.classList.remove('no-scroll'); // Re-enable body scroll
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === feedbackModal) { // Check if the click was directly on the modal background
            feedbackModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Basic Form Submission (using Formspree as an example) ---
    // The actual submission is handled by the `action` attribute in HTML.
    // This JS simply provides a client-side alert for user feedback.
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            // No e.preventDefault() here if using Formspree action for actual submission
            // This alert will show before the browser redirects to Formspree's thank you page (or stays if AJAX is used for form submission)
            // For this basic setup, letting the form's native submission handle it.
            setTimeout(() => { // Give Formspree a moment to process before alert
                alert('Thank you for your feedback! It helps us improve.');
                feedbackModal.classList.remove('active'); // Close modal on submission
                document.body.classList.remove('no-scroll');
                this.reset(); // Clear the form
            }, 100);
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // No e.preventDefault() here if using Formspree action
             setTimeout(() => { // Give Formspree a moment to process before alert
                alert('Thank you for your message! We will get back to you soon.');
                this.reset(); // Clear the form
            }, 100);
        });
    }
});
