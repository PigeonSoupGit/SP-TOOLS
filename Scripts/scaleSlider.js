export function initScaleSlider() {
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleValue = document.getElementById('scaleValue');
    const mainContent = document.querySelector('body');
    
    // Load saved scale
    const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{"scale": "100"}');
    scaleSlider.value = savedSettings.scale;
    scaleValue.textContent = savedSettings.scale + '%';
    
    // Apply initial scale with transition
    mainContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    mainContent.style.transform = `scale(${savedSettings.scale / 100})`;
    mainContent.style.transformOrigin = 'top center';

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle scale changes
    const updateScale = debounce((value) => {
        mainContent.style.transform = `scale(${value / 100})`;
        saveSettings(value);
    }, 16); // Approximately 1 frame at 60fps

    scaleSlider.addEventListener('input', (e) => {
        const value = Math.round(e.target.value / 5) * 5;
        scaleValue.textContent = value + '%';
        updateScale(value);
    });

    // Handle scale dot clicks
    document.querySelectorAll('.scale-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const value = dot.getAttribute('data-value');
            scaleSlider.value = value;
            scaleValue.textContent = value + '%';
            updateScale(parseInt(value));
        });
    });

    function saveSettings(scaleValue) {
        const settings = {
            scale: scaleValue
        };
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }
}