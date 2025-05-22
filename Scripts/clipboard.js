import { addToHistory } from './clipboardHistory.js';
import { showNotification } from './utils.js';
// This function copies the text content of an element to the clipboard - But also adds it to the history (and some other crap that i'm still working on implimenting)
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
// Takes the Dimentions of a box and copies them to the clipboard in a specific format (widthXheightXdepth@weightkg + my initials and the date)
window.copyFormattedNumbers = function() {
    const numbers = ['num1', 'num2', 'num3', 'num4'].map(id => 
        document.getElementById(id).value || '0'
    );
    // Get the current date in the format
    const currentDate = new Date().toLocaleDateString('en-GB');
    // Format the numbers as "widthXheightXdepth@weightkg"
    const formatted = `${numbers[0]}X${numbers[1]}X${numbers[2]}@${numbers[3]}kg\nMN ${currentDate}`;
    // Copy the formatted string to the clipboard
    navigator.clipboard.writeText(formatted)
        .then(() => {
            addToHistory(formatted, 'formatted');
            showNotification();
        })
        .catch(err => console.error('Failed to copy text:', err));
};
// This is still a concept - Copy the numbers to the clipboard in a tab delimited format, hope one day i can paste them into Shipping software that has 4 fields for the numbers.
window.copyNumbersWithTabs = function() {
    const numbers = ['num1', 'num2', 'num3', 'num4'].map(id => 
        document.getElementById(id).value || '0'
    );
    const formattedWithTabs = numbers.join('\t');
    // Copy the formatted string to the clipboard
    navigator.clipboard.writeText(formattedWithTabs)
        .then(() => {
            addToHistory(formattedWithTabs, 'tabbed');
            showNotification();
        })
        .catch(err => console.error('Failed to copy text:', err));
};
// rememberText is a function that adds the text to the history tab, allowing users to see what they have copied in the past.
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