document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Accordion FAQ Logic
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isActive = trigger.classList.contains('active');
            
            // Close all
            accordionTriggers.forEach(t => t.classList.remove('active'));
            
            // Toggle current
            if(!isActive) {
                trigger.classList.add('active');
            }
        });
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // If we had a data-src, we would swap it here. Modern browsers handle loading="lazy" natively.
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100', 'transition-opacity', 'duration-500');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            img.classList.add('opacity-0'); // starts hidden for fade in
            imageObserver.observe(img);
        });
    }

    // Header scroll background change
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-opacity-95', 'shadow-md');
            header.classList.remove('bg-opacity-100');
        } else {
            header.classList.remove('bg-opacity-95', 'shadow-md');
            header.classList.add('bg-opacity-100');
        }
    });

    // Simple Form Validation (Example for contact blocks)
    const forms = document.querySelectorAll('form.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                // Custom error feedback could be injected here
            }
            form.classList.add('was-validated');
        });
    });

});
