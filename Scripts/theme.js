export const themes = {
    Default: {
        background: 'linear-gradient(135deg, #f0f2f5, #e6e9ed)',
        primary: '#4a90e2',
        primaryGradient: 'linear-gradient(120deg, #4a90e2, #357abd)',
        primaryHover: 'linear-gradient(135deg, #357abd, #2868a0)',
        tertiary: '#34495e',
        tertiaryGradient: 'linear-gradient(120deg, #34495e, #2c3e50)',
        tertiaryShadow: 'rgba(52, 73, 94, 0.2)',
        text: '#2d3436',
        borderColor: '#e0e0e0',
        inputBg: '#f8f9fa',
        widgetBg: 'white',
        labelColor: '#666',
        scrollbarTrack: 'rgba(0, 0, 0, 0.05)'
    },
    Honey: {
        background: 'linear-gradient(135deg, #fff9e6, #fff2cc)',
        primary: '#ffa000',
        primaryGradient: 'linear-gradient(120deg, #ffa000, #ff8f00)',
        primaryHover: 'linear-gradient(135deg, #ff8f00, #ff6f00)',
        tertiary: '#8d6e63',
        tertiaryGradient: 'linear-gradient(120deg, #8d6e63, #795548)',
        tertiaryShadow: 'rgba(141, 110, 99, 0.2)',
        text: '#704214',
        borderColor: '#ffe0b2',
        inputBg: '#fffbf0',
        widgetBg: '#ffffff',
        labelColor: '#956834',
        scrollbarTrack: 'rgba(255, 160, 0, 0.05)'
    },
    Dracula: {
        background: 'linear-gradient(135deg, #282a36, #1a1e2e)',
        primary: '#bd93f9',
        primaryGradient: 'linear-gradient(120deg, #bd93f9, #9580ff)',
        primaryHover: 'linear-gradient(135deg, #9580ff, #7b6aff)',
        tertiary: '#50fa7b',
        tertiaryGradient: 'linear-gradient(120deg, #50fa7b, #42b86b)',
        tertiaryShadow: 'rgba(80, 250, 123, 0.2)',
        text: '#f8f8f2',
        borderColor: '#44475a',
        inputBg: '#1e1f29',
        inputText: '#f8f8f2',
        widgetBg: '#282a36',
        labelColor: '#6272a4',
        headingColor: '#f8f8f2',
        scrollbarTrack: '#1e1f29'
    },
    Candyland: {
        background: 'linear-gradient(135deg, #ffe6f2, #ffd1e6)',
        primary: '#ff80ab',
        primaryGradient: 'linear-gradient(120deg, #ff80ab, #ff4081)',
        primaryHover: 'linear-gradient(135deg, #ff4081, #f50057)',
        tertiary: '#7c4dff',
        tertiaryGradient: 'linear-gradient(120deg, #7c4dff, #651fff)',
        tertiaryShadow: 'rgba(124, 77, 255, 0.2)',
        text: '#4a4a4a',
        borderColor: '#ffcce6',
        inputBg: '#fff5f9',
        widgetBg: 'white',
        labelColor: '#ff66a3',
        scrollbarTrack: 'rgba(255, 128, 171, 0.05)'
    },
    Ocean: {
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        primary: '#1976d2',
        primaryGradient: 'linear-gradient(120deg, #1976d2, #1565c0)',
        primaryHover: 'linear-gradient(135deg, #1565c0, #0d47a1)',
        tertiary: '#00acc1',
        tertiaryGradient: 'linear-gradient(120deg, #00acc1, #0097a7)',
        tertiaryShadow: 'rgba(0, 172, 193, 0.2)',
        text: '#1a237e',
        borderColor: '#90caf9',
        inputBg: '#f1f8fe',
        widgetBg: 'white',
        labelColor: '#0d47a1',
        scrollbarTrack: 'rgba(25, 118, 210, 0.05)'
    },
    Forest: {
        background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
        primary: '#2e7d32',
        primaryGradient: 'linear-gradient(120deg, #2e7d32, #1b5e20)',
        primaryHover: 'linear-gradient(135deg, #1b5e20, #004d40)',
        tertiary: '#ff7043',
        tertiaryGradient: 'linear-gradient(120deg, #ff7043, #f4511e)',
        tertiaryShadow: 'rgba(255, 112, 67, 0.2)',
        text: '#1b5e20',
        borderColor: '#a5d6a7',
        inputBg: '#f1f8f1',
        widgetBg: 'white',
        labelColor: '#388e3c',
        scrollbarTrack: 'rgba(46, 125, 50, 0.05)'
    }
};

function updateScrollbarStyles(theme) {
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        ::-webkit-scrollbar {
            width: 12px;
        }
        
        ::-webkit-scrollbar-track {
            background: ${theme.scrollbarTrack || 'rgba(0, 0, 0, 0.05)'};
            border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb {
            background: ${theme.primaryGradient};
            border-radius: 6px;
            border: 3px solid ${theme.scrollbarTrack || 'rgba(0, 0, 0, 0.05)'};
            background-clip: content-box;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: ${theme.primaryHover};
            background-clip: content-box;
        }
    `;

    const oldScrollbarStyle = document.querySelector('style[data-scrollbar]');
    if (oldScrollbarStyle) oldScrollbarStyle.remove();

    scrollbarStyle.setAttribute('data-scrollbar', 'true');
    document.head.appendChild(scrollbarStyle);
}

export function applyTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;

    // Apply CSS variables to root element
    const root = document.documentElement;
    root.style.setProperty('--background', theme.background);
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-gradient', theme.primaryGradient);
    root.style.setProperty('--primary-hover', theme.primaryHover);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--border-color', theme.borderColor);
    root.style.setProperty('--input-bg', theme.inputBg);
    root.style.setProperty('--widget-bg', theme.widgetBg);
    root.style.setProperty('--label-color', theme.labelColor);
    root.style.setProperty('--input-text', theme.inputText || theme.text);
    root.style.setProperty('--tertiary', theme.tertiary);
    root.style.setProperty('--tertiary-gradient', theme.tertiaryGradient);
    root.style.setProperty('--tertiary-shadow', theme.tertiaryShadow);

    // Add all dynamic styles in one block
    const dynamicStyle = document.createElement('style');
    dynamicStyle.textContent = `
        .history-item:hover {
            border-left: 3px solid ${theme.tertiary};
            padding-left: calc(0.75rem - 3px);
        }
        
        .widget:hover {
            box-shadow: 0 12px 30px ${theme.tertiaryShadow};
        }
        
        .tab-button.active {
            background: ${theme.primaryGradient};
            border-bottom: 3px solid ${theme.primary};
        }
        
        h2 {
            border-image: linear-gradient(to right, ${theme.primary}, ${theme.tertiary}) 1;
            border-bottom: 2px solid;
        }
        
        .scale-dot::after {
            color: ${theme.tertiary};
        }
        
        textarea:focus, .output:focus {
            border-color: ${theme.primary};
            box-shadow: 0 0 0 3px ${theme.tertiaryShadow};
        }
        
        .edit-mode .widget::before {
            color: ${theme.tertiary};
        }

        .theme-option:hover {
            background: ${theme.text}0A !important;
        }
        
        .theme-option.active {
            background: ${theme.text}14 !important;
        }
    `;

    // Remove any previous dynamic styles
    const oldDynamicStyle = document.querySelector('style[data-dynamic]');
    if (oldDynamicStyle) oldDynamicStyle.remove();

    dynamicStyle.setAttribute('data-dynamic', 'true');
    document.head.appendChild(dynamicStyle);

    // Rest of the function remains the same...
    // Apply theme to body
    document.body.style.background = theme.background;
    document.body.style.color = theme.text;

    // Update headings
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.style.color = theme.headingColor || theme.text;
    });

    // Update inputs and outputs
    document.querySelectorAll('input, textarea, .output').forEach(element => {
        element.style.background = theme.inputBg;
        element.style.color = theme.inputText || theme.text;
        element.style.borderColor = theme.borderColor;
    });

    // Update settings panel and its components
    const settingsPanel = document.querySelector('.settings-panel');
    if (settingsPanel) {
        settingsPanel.style.background = theme.widgetBg;
        settingsPanel.style.color = theme.text;
        settingsPanel.style.borderColor = theme.borderColor;
    }

    // Update theme dropdown and options
    const themeDropdown = document.querySelector('.theme-dropdown');
    if (themeDropdown) {
        themeDropdown.style.background = theme.widgetBg;
    }

    // Update theme options
    document.querySelectorAll('.theme-option').forEach(option => {
        option.style.color = theme.text;
        if (option.classList.contains('active')) {
            option.style.background = `${theme.text}14`; // 8% opacity
        }
    });

    // Update buttons
    const buttons = document.querySelectorAll('button:not(.settings-button):not(.theme-button)');
    buttons.forEach(button => {
        button.style.background = theme.primaryGradient;
    });

    // Update settings button
    const settingsButton = document.querySelector('.settings-button');
    if (settingsButton) {
        settingsButton.style.background = theme.primaryGradient;
    }

    // Update scrollbar
    updateScrollbarStyles(theme);

    // Save theme preference
    localStorage.setItem('selectedTheme', themeName);
}

export function initTheme() {
    // Load saved theme preference or use default
    const savedTheme = localStorage.getItem('selectedTheme') || 'Default';
    applyTheme(savedTheme);
}