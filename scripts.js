document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT SELECTORS ---
    const mainHeader = document.getElementById('main-header');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuContent = document.getElementById('mobile-menu-content');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    const faqToggles = document.querySelectorAll('.faq-toggle');

    // --- 1. STICKY HEADER ---
    // Adds a 'scrolled' class to the header when you scroll down.
    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled'); // You can style '.scrolled' in your CSS
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- 2. MODERN MOBILE MENU ---
    const openMenu = () => {
        mobileMenuOverlay.classList.remove('pointer-events-none', 'opacity-0');
        mobileMenuContent.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden'); // Lock body scroll

        // Staggered animation for menu items
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('opacity-0', '-translate-y-4');
            }, 150 + (index * 75));
        });
    };

    const closeMenu = () => {
        mobileMenuContent.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.classList.remove('overflow-hidden'); // Unlock body scroll

        // Reset menu items for the next time the menu is opened
        menuItems.forEach(item => {
            item.classList.add('opacity-0', '-translate-y-4');
        });
    };

    navToggle.addEventListener('click', openMenu);
    closeMobileMenuBtn.addEventListener('click', closeMenu);

    // --- 3. SMOOTH SCROLL FOR ALL LINKS ---
    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetId.length > 1 && targetElement) {
                e.preventDefault();

                // Close the mobile menu if a link is clicked
                if (!mobileMenuContent.classList.contains('translate-x-full')) {
                    closeMenu();
                }

                const headerOffset = mainHeader.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 4. FAQ ACCORDION ---
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = toggle.querySelector('i');
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item.active').forEach(openItem => {
                if (openItem !== faqItem) {
                    openItem.classList.remove('active');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                    openItem.querySelector('.faq-toggle i').classList.replace('fa-minus', 'fa-plus');
                }
            });

            // Toggle the clicked FAQ
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
});