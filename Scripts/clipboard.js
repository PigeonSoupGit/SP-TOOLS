import { addToHistory } from './clipboardHistory.js';
import { showNotification } from './utils.js';

function copyText(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text)
        .then(() => {
            addToHistory(text, 'case');
            showNotification();
        })
        .catch(err => console.error('Failed to copy text:', err));
}

window.copyFormattedNumbers = function() {
    const numbers = ['num1', 'num2', 'num3', 'num4'].map(id => 
        document.getElementById(id).value || '0'
    );
    const currentDate = new Date().toLocaleDateString('en-GB');
    const formatted = `${numbers[0]}X${numbers[1]}X${numbers[2]}@${numbers[3]}kg\nMN ${currentDate}`;
    
    navigator.clipboard.writeText(formatted)
        .then(() => {
            addToHistory(formatted, 'formatted');
            showNotification();
        })
        .catch(err => console.error('Failed to copy text:', err));
};

window.copyNumbersWithTabs = function() {
    const numbers = ['num1', 'num2', 'num3', 'num4'].map(id => 
        document.getElementById(id).value || '0'
    );
    const formattedWithTabs = numbers.join('\t');
    
    navigator.clipboard.writeText(formattedWithTabs)
        .then(() => {
            addToHistory(formattedWithTabs, 'tabbed');
            showNotification();
        })
        .catch(err => console.error('Failed to copy text:', err));
};

window.rememberText = function() {
    const rememberInput = document.getElementById('rememberText');
    const text = rememberInput.value.trim();
    
    if (text) {
        addToHistory(text, 'remembered');
        showNotification();
        rememberInput.value = ''; // Clear the input after remembering
    }
};

export { copyText };