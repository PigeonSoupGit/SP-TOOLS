export function showNotification() {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Copied!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 1500);
}