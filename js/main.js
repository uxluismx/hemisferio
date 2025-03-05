// INICIALIZAR AOS
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// MANIOBRA PARA REEMPLAZAR ICONOS EN CUALQUIER COMPONENTE
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.icon[class*="icon-"]').forEach(icon => {
        const iconName = icon.className.match(/icon-([^\s]+)/)?.[1];
        if (iconName) {
            const iconUrl = `url(../assets/icons/${iconName}.svg)`;
            icon.style.cssText = `
                --url: ${iconUrl};
                -webkit-mask-image: ${iconUrl};
                mask-image: ${iconUrl};
            `;
        }
    });
});

// AGREGAR HEIGHT DEL NAVIGATION AL PADDING-BLOCK-START DEL HERO
document.addEventListener('DOMContentLoaded', () => {
    const navigation = document.querySelector('.navigation');
    const hero = document.querySelector('.hero');

    if (navigation && hero) {
        const navHeight = navigation.offsetHeight;
        const remValue = navHeight / 16; // Convert pixels to rem (16px = 1rem)
        hero.style.setProperty('--height-navigation', `${remValue}rem`);
    }
});

// MANIOBRA PARA REEMPLAZAR IMG EN LOS PROJECT CARDS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {
        const img = card.querySelector('img');
        if (img && img.src) {
            // Extract just the path without the domain
            const path = new URL(img.src).pathname;
            // Set it as a CSS variable on the card
            card.style.setProperty('--url', `url(${path})`);
        }
    });
});

// MANIOBRA PARA ASIGNAR CLASE AL HIJO DIRECTO DE BIG TOGGLE
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.big-toggle').forEach(toggle => {
        const borderTrick = toggle.querySelector('.toggle-border-trick');
        if (borderTrick) {
            const colorClasses = ['gray', 'blue', 'emerald', 'red', 'purple', 'orange']; // Add all possible color classes

            // Find which color class the toggle has
            const foundColorClass = colorClasses.find(colorClass => toggle.classList.contains(colorClass));

            if (foundColorClass) {
                borderTrick.classList.add(foundColorClass);
            }
        }
    });
});