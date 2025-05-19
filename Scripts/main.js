import { initTheme } from './theme.js';
import { initSettings } from './settings.js';
import { initCaseConverter } from './caseConverter.js';
import { initNumberFormatter } from './numberFormatter.js';
import { initScaleSlider } from './scaleSlider.js';
import { copyText } from './clipboard.js';
import { initClipboardHistory } from './clipboardHistory.js';
import { initWidgetLayout } from './widgetLayout.js';
import { initIncreaseByThirty } from './increaseByThirty.js';


// Make copyText available globally
window.copyText = copyText;

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSettings();
    initCaseConverter();
    initNumberFormatter();
    initScaleSlider();
    initClipboardHistory();
    initWidgetLayout();
    initIncreaseByThirty();
});