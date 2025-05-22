// Simple script to times the shipping amount by 1.3 - Avoids having to press operation buttons on the calculator. Also spits it out in plain english.
export function initIncreaseByThirty() {
    const numberInput = document.getElementById('numberInput');
    const increasedOutput = document.getElementById('increasedOutput');

    function increaseByThirty() {
        const number = parseFloat(numberInput.value);
        if (isNaN(number)) {
            increasedOutput.textContent = 'Please enter a valid number.';
        } else {
            const increased = number * 1.3;
            increasedOutput.textContent = `${number} + 30% is ${increased.toFixed(2)}`;
        }
    }

    numberInput.addEventListener('input', increaseByThirty);
}