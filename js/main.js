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

// CAMBIAR EL NAVIGATION AL MODO LIGHT CUANDO SE LLEGA A UNA SECCIÓN EN MODO LIGHT
document.addEventListener('DOMContentLoaded', () => {
    const navigationDark = document.querySelector('.navigation.dark');
    const navigationLight = document.querySelector('.navigation.light');

    if (navigationDark && navigationLight) {
        const switchMode = () => {
            let modeSet = false;
            document.querySelectorAll('section').forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 104 && rect.bottom > 104) {
                    if (section.classList.contains('light')) {
                        navigationLight.style.opacity = '1';
                        navigationLight.style.zIndex = '11';
                        navigationDark.style.opacity = '0';
                        navigationDark.style.zIndex = '10'; // Always set z-index for inactive element
                    } else {
                        navigationDark.style.opacity = '1';
                        navigationDark.style.zIndex = '11';
                        navigationLight.style.opacity = '0';
                        navigationLight.style.zIndex = '10'; // Always set z-index for inactive element
                    }
                    modeSet = true;
                }
            });
            // Fallback: if no section is intersecting, default to dark mode.
            if (!modeSet) {
                navigationDark.style.opacity = '1';
                navigationDark.style.zIndex = '11';
                navigationLight.style.opacity = '0';
                navigationLight.style.zIndex = '10'; // Keep consistent z-index handling
            }
        };

        // Execute on load, scroll, and resize
        switchMode();
        window.addEventListener('scroll', switchMode);
        window.addEventListener('resize', switchMode);
    }
});

// SCROLL SUAVE EN TODA LA WEB EN GENERAL
(() => {
    // Configuración personalizable para el scroll suave
    const smoothScrollConfig = {
        enabled: true,                // Activar/desactivar el scroll suave
        method: 'js',                // Método: 'css' (nativo) o 'js' (personalizado)

        // Configuración para el método CSS
        cssOptions: {
            scrollBehavior: 'smooth'  // 'smooth' o 'auto'
        },

        // Configuración para el método JavaScript
        jsOptions: {
            duration: 2000,            // Duración en milisegundos
            offset: 0,                // Offset adicional en píxeles
            easing: 'easeInOutCubic'   // 'linear', 'easeInOutQuad', 'easeInOutCubic'
        }
    };

    // Si está deshabilitado, no hacer nada
    if (!smoothScrollConfig.enabled) return;

    // Aplicar el método CSS (más eficiente y recomendado)
    if (smoothScrollConfig.method === 'css') {
        const style = document.createElement('style');
        style.innerHTML = `
            html {
                scroll-behavior: ${smoothScrollConfig.cssOptions.scrollBehavior};
            }
        `;
        document.head.appendChild(style);
    }
    // Aplicar el método JavaScript (más personalizable)
    else if (smoothScrollConfig.method === 'js') {
        // Funciones de easing disponibles
        const easingFunctions = {
            linear: t => t,
            easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        };

        // Obtener la función de easing seleccionada
        const selectedEasing = easingFunctions[smoothScrollConfig.jsOptions.easing] || easingFunctions.easeInOutQuad;

        // Personalizar scrollIntoView para enlaces internos
        const originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function (options) {
            if (!options || options.behavior !== 'smooth') {
                return originalScrollIntoView.apply(this, arguments);
            }

            const startY = window.pageYOffset;
            const targetY = this.getBoundingClientRect().top + startY + smoothScrollConfig.jsOptions.offset;
            const distance = targetY - startY;
            const startTime = performance.now();

            function step() {
                const currentTime = performance.now();
                const elapsed = currentTime - startTime;

                if (elapsed > smoothScrollConfig.jsOptions.duration) {
                    window.scrollTo(0, targetY);
                    return;
                }

                const t = elapsed / smoothScrollConfig.jsOptions.duration;
                const easedT = selectedEasing(t);
                window.scrollTo(0, startY + distance * easedT);

                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        };
    }
})();

// SCROLL SUAVE CUANDO SE HACE CLICK EN UN LINK DEL NAV
document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation containers that might contain links
    const navContainers = document.querySelectorAll('.tabs-container, .navigation, nav');

    navContainers.forEach(container => {
        if (container) {
            container.addEventListener('click', (event) => {
                // Find closest anchor element (works even if child elements are clicked)
                const anchor = event.target.closest('a');

                if (anchor) {
                    const targetId = anchor.getAttribute('href');

                    // Make sure it's an internal link (starts with #)
                    if (targetId && targetId.startsWith('#')) {
                        event.preventDefault();
                        const targetSection = document.querySelector(targetId);

                        if (targetSection) {
                            // Smooth scroll to the target section
                            targetSection.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
        }
    });
});

