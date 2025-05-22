// Case Converter - Takes an email from the user and converts it to lowercase.
export function initCaseConverter() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');

    inputText.addEventListener('input', function() {
        outputText.textContent = this.value.toLowerCase();
    });
}