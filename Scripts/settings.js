import { applyTheme } from './theme.js';

export function initSettings() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.querySelector('.settings-panel');

    settingsToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = settingsPanel.classList.toggle('open');
        settingsToggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
            settingsPanel.classList.remove('open');
            settingsToggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            settingsPanel.classList.remove('open');
            settingsToggle.setAttribute('aria-expanded', 'false');
        }
    });

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            applyTheme(option.dataset.theme);
        });
    });

    const savedTheme = localStorage.getItem('selectedTheme') || 'Default';
    document.querySelector(`[data-theme="${savedTheme}"]`)?.classList.add('active');
}
