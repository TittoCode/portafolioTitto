/**
 * Dark Mode - Static Version
 */
const initDarkMode = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');

    // Load initial theme
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        if (themeToggleBtnMobile) themeToggleBtnMobile.textContent = '🌞';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        if (themeToggleBtnMobile) themeToggleBtnMobile.textContent = '🌙';
    }

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            updateIcons(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            updateIcons(true);
        }
    };

    const updateIcons = (isDark) => {
        if (themeToggleLightIcon && themeToggleDarkIcon) {
            if (isDark) {
                themeToggleLightIcon.classList.remove('hidden');
                themeToggleDarkIcon.classList.add('hidden');
            } else {
                themeToggleLightIcon.classList.add('hidden');
                themeToggleDarkIcon.classList.remove('hidden');
            }
        }
        if (themeToggleBtnMobile) themeToggleBtnMobile.textContent = isDark ? '🌞' : '🌙';
    };

    if (themeToggleBtn) themeToggleBtn.onclick = toggleTheme;
    if (themeToggleBtnMobile) themeToggleBtnMobile.onclick = toggleTheme;
};

// Auto-init for static loading
if (typeof document !== 'undefined') {
    window.initDarkMode = initDarkMode;
}
