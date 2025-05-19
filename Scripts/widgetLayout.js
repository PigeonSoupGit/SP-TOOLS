export function initWidgetLayout() {
    const editModeToggle = document.getElementById('editModeToggle');
    const widgetsContainer = document.querySelector('.widgets-container');
    let isDragging = false;
    let draggedWidget = null;
    let initialX, initialY;

    // Load saved layout
    loadLayout();

    editModeToggle.addEventListener('click', () => {
        editModeToggle.classList.toggle('active');
        document.body.classList.toggle('edit-mode');
        
        // Disable text selection during edit mode
        document.body.style.userSelect = document.body.classList.contains('edit-mode') ? 'none' : 'text';
    });

    function handleDragStart(e) {
        if (!document.body.classList.contains('edit-mode')) return;
        
        // Only start drag on widget header or handle
        const widget = e.target.closest('.widget');
        if (!widget || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        e.preventDefault();
        isDragging = true;
        draggedWidget = widget;
        widget.classList.add('dragging');

        // Store initial positions
        initialX = e.clientX;
        initialY = e.clientY;

        // Create placeholder
        const placeholder = widget.cloneNode(true);
        placeholder.style.visibility = 'hidden';
        placeholder.classList.add('placeholder');
        widget.after(placeholder);
    }

    function handleDrag(e) {
        if (!isDragging) return;

        e.preventDefault();
        
        const widgets = [...widgetsContainer.querySelectorAll('.widget:not(.dragging)')];
        
        // Find the widget we're hovering over
        const widget = widgets.find(w => {
            const rect = w.getBoundingClientRect();
            return e.clientY < rect.bottom && e.clientY > rect.top;
        });

        if (widget) {
            const placeholder = widgetsContainer.querySelector('.placeholder');
            const rect = widget.getBoundingClientRect();
            const afterElement = e.clientY > rect.top + rect.height / 2;
            
            if (afterElement) {
                widget.after(placeholder);
            } else {
                widget.before(placeholder);
            }
        }
    }

    function handleDragEnd(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        isDragging = false;
        
        const placeholder = widgetsContainer.querySelector('.placeholder');
        if (placeholder && draggedWidget) {
            placeholder.replaceWith(draggedWidget);
            draggedWidget.classList.remove('dragging');
            saveLayout();
        }
        
        draggedWidget = null;
    }

    // Event listeners
    widgetsContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);

    function saveLayout() {
        const widgets = [...widgetsContainer.querySelectorAll('.widget')];
        const layout = widgets.map(widget => widget.querySelector('h2').textContent);
        localStorage.setItem('widgetLayout', JSON.stringify(layout));
    }

    function loadLayout() {
        const savedLayout = JSON.parse(localStorage.getItem('widgetLayout'));
        if (!savedLayout) return;

        const widgets = [...widgetsContainer.querySelectorAll('.widget')];
        const widgetMap = new Map(widgets.map(widget => [
            widget.querySelector('h2').textContent,
            widget
        ]));

        savedLayout.forEach(widgetTitle => {
            const widget = widgetMap.get(widgetTitle);
            if (widget) {
                widgetsContainer.appendChild(widget);
            }
        });
    }
}