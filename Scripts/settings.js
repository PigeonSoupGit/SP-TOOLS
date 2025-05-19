import { applyTheme } from './theme.js';

export function initSettings() {
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.querySelector('.settings-panel');

    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            applyTheme(option.dataset.theme);
        });
    });

    // Set initial active theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'Default';
    document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
}