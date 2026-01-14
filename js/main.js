/**
 * Main Entry Point - Static Version
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    if (window.initDarkMode) window.initDarkMode();
    if (window.initAnimations) window.initAnimations();
    if (window.initFormHandler) window.initFormHandler();

    console.log('Portfolio (Static) inicializado correctamente.');
});
