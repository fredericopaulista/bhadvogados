const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

const newStyles = `
/* Premium UI/UX Updates */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap');

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Outfit', 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8fafc;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif;
    letter-spacing: -0.02em;
}

/* Glassmorphism Effect */
.glass {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Accordion Transitions */
.accordion-content {
    transition: max-height 0.4s cubic-bezier(0, 1, 0, 1), opacity 0.4s ease-out;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
}

.accordion-trigger.active + .accordion-content {
    max-height: 1000px;
    opacity: 1;
    transition: max-height 0.6s ease-in-out, opacity 0.6s ease-in-out;
}

.accordion-trigger .chevron {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-trigger.active .chevron {
    transform: rotate(180deg);
}

/* Floating WhatsApp Button Animation */
@keyframes pulse-whatsapp {
    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.8); }
    70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.btn-whatsapp-float {
    animation: pulse-whatsapp 2s infinite;
    transition: transform 0.3s ease;
}

.btn-whatsapp-float:hover {
    transform: scale(1.1);
}

/* Hover interlinks */
.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.hover-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Primary Brand Colors: Dark Blue */
.bg-brand-dark { background-color: #0f172a; }
.text-brand-dark { color: #0f172a; }
.bg-brand-darker { background-color: #020617; }
.text-brand-gold { color: #d4af37; }
.border-brand-gold { border-color: #d4af37; }

/* Focus outlines for accessibility */
*:focus-visible {
    outline: 2px solid #d4af37;
    outline-offset: 2px;
}
`;

fs.writeFileSync('style.css', newStyles);
