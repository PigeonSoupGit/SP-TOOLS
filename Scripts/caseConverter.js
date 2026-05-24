export function initCaseConverter() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const caseMeta = document.getElementById('caseMeta');

    inputText.addEventListener('input', function() {
        const value = this.value;
        outputText.textContent = value.toLowerCase();

        if (caseMeta) {
            const count = value.length;
            caseMeta.textContent = `${count} character${count === 1 ? '' : 's'}`;
        }
    });
}
