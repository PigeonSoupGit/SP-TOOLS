export function initNumberFormatter() {
    const numberOutput = document.getElementById('numberOutput');
    const numberInputs = ['num1', 'num2', 'num3', 'num4'].map(id => document.getElementById(id));

    numberInputs.forEach(input => {
        input.addEventListener('input', updateNumberOutput);
    });
    // update the output on any input change
    function updateNumberOutput() {
        const numbers = numberInputs.map(input => input.value || '0');
        const currentDate = new Date().toLocaleDateString('en-GB');
        const formatted = `${numbers[0]}X${numbers[1]}X${numbers[2]}@${numbers[3]}kg\nMN ${currentDate}`;
        numberOutput.textContent = formatted;

        const simpleOutput = numbers.join(' ');
        document.getElementById('simpleNumberOutput').textContent = simpleOutput;
    }
}