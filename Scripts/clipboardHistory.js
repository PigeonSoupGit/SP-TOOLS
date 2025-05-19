import { showNotification } from './utils.js';

const MAX_HISTORY_ITEMS = 20;

export function initClipboardHistory() {
    const history = loadHistory();
    renderHistory();
    
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabId = button.dataset.tab;
            document.querySelectorAll('.history-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(`${tabId}History`).classList.add('active');
        });
    });
}

export function addToHistory(text, type) {
    const history = loadHistory();
    
    // Initialize the array for this type if it doesn't exist
    if (!history[type]) {
        history[type] = [];
    }
    
    if (history[type].length > 0 && history[type][0] === text) {
        return;
    }
    
    history[type].unshift(text);
    history[type] = history[type].slice(0, MAX_HISTORY_ITEMS);
    saveHistory(history);
    renderHistory();
}

function loadHistory() {
    const defaultHistory = {
        case: [],
        formatted: [],
        tabbed: [],
        remembered: []  // Make sure this line is included
    };
    return JSON.parse(localStorage.getItem('clipboardHistory') || JSON.stringify(defaultHistory));
}

function saveHistory(history) {
    localStorage.setItem('clipboardHistory', JSON.stringify(history));
}

function renderHistory() {
    const history = loadHistory();
    
    Object.entries(history).forEach(([type, items]) => {
        const container = document.getElementById(`${type}History`);
        if (container) {
            container.innerHTML = items.map((item, index) => `
                <div class="history-item">
                    <span class="history-text">${item}</span>
                    <div class="history-buttons">
                        <button onclick="copyHistoryItem('${type}', ${index})">Copy</button>
                        <button class="delete-btn" onclick="deleteHistoryItem('${type}', ${index})">×</button>
                    </div>
                </div>
            `).join('');
        }
    });
}

window.copyHistoryItem = function(type, index) {
    const history = loadHistory();
    const text = history[type][index];
    navigator.clipboard.writeText(text)
        .then(showNotification)
        .catch(err => console.error('Failed to copy text:', err));
};

window.deleteHistoryItem = function(type, index) {
    const history = loadHistory();
    history[type].splice(index, 1);
    saveHistory(history);
    renderHistory();
};