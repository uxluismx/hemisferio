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
    duration: 1000, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// MANIOBRA PARA REEMPLAZAR ICONOS EN CUALQUIER COMPONENTE
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos que tengan la clase 'icon'
    const icons = document.querySelectorAll('.icon');

    icons.forEach(icon => {
        // Busca la clase que comience con 'icon-' en la lista de clases del elemento
        const iconClass = Array.from(icon.classList).find(cls => cls.startsWith('icon-'));

        if (iconClass) {
            // Extrae el nombre del ícono removiendo el prefijo 'icon-'
            const iconName = iconClass.replace('icon-', '');

            // Establece la URL del ícono como una variable CSS personalizada
            icon.style.setProperty('--url', `url(../assets/icons/${iconName}.svg)`);

            // Aplica la máscara usando la variable CSS para compatibilidad cross-browser
            icon.style.maskImage = `var(--url)`;
            icon.style.webkitMaskImage = `var(--url)`;
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