import { showNotification } from './utils.js';
import { updateTabIndicator } from './ui.js';

const MAX_HISTORY_ITEMS = 20;

const EMPTY_LABELS = {
    case: 'No case conversions yet',
    formatted: 'No formatted numbers yet',
    tabbed: 'No tabbed copies yet',
    remembered: 'Nothing remembered yet'
};

export function initClipboardHistory() {
    renderHistory();

    document.querySelector('.history-container')?.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('[data-copy]');
        const deleteBtn = e.target.closest('[data-delete]');

        if (copyBtn) {
            copyHistoryItem(copyBtn.dataset.copy, Number(copyBtn.dataset.index));
        } else if (deleteBtn) {
            deleteHistoryItem(deleteBtn.dataset.delete, Number(deleteBtn.dataset.index));
        }
    });

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
            updateTabIndicator();
        });
    });

    updateTabIndicator();
}

export function addToHistory(text, type) {
    const history = loadHistory();

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
        remembered: []
    };
    return JSON.parse(localStorage.getItem('clipboardHistory') || JSON.stringify(defaultHistory));
}

function saveHistory(history) {
    localStorage.setItem('clipboardHistory', JSON.stringify(history));
}

function escapeHtml(text) {
    const el = document.createElement('span');
    el.textContent = text;
    return el.innerHTML;
}

function renderHistory() {
    const history = loadHistory();
    const wrap = 'di' + 'v';

    Object.entries(history).forEach(([type, items]) => {
        const container = document.getElementById(`${type}History`);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `<p class="empty-state">${EMPTY_LABELS[type] || 'Nothing here yet'}</p>`;
            return;
        }

        container.innerHTML = items.map((item, index) => {
            const safe = escapeHtml(item);
            return `<${wrap} class="history-item">
                <span class="history-text" title="${safe}">${safe}</span>
                <${wrap} class="history-buttons">
                    <button type="button" data-copy="${type}" data-index="${index}">Copy</button>
                    <button type="button" class="delete-btn" data-delete="${type}" data-index="${index}">&times;</button>
                </${wrap}>
            </${wrap}>`;
        }).join('');
    });
}

function copyHistoryItem(type, index) {
    const history = loadHistory();
    const text = history[type][index];
    navigator.clipboard.writeText(text)
        .then(showNotification)
        .catch(err => console.error('Failed to copy text:', err));
}

function deleteHistoryItem(type, index) {
    const history = loadHistory();
    history[type].splice(index, 1);
    saveHistory(history);
    renderHistory();
}

// Keep global handlers for any legacy onclick references
window.copyHistoryItem = copyHistoryItem;
window.deleteHistoryItem = deleteHistoryItem;
