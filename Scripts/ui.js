export function initUi() {
    initTabIndicator();
    window.addEventListener('resize', updateTabIndicator);
}

export function updateTabIndicator() {
    const container = document.querySelector('.tab-container');
    const indicator = document.querySelector('.tab-indicator');
    const activeTab = document.querySelector('.tab-button.active');

    if (!container || !indicator || !activeTab) return;

    const containerRect = container.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    indicator.style.left = `${tabRect.left - containerRect.left}px`;
    indicator.style.width = `${tabRect.width}px`;
}

function initTabIndicator() {
    requestAnimationFrame(updateTabIndicator);
}
