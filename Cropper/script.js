let isDrawing = false;
let startX, startY, cropX, cropY, cropWidth, cropHeight;
let originalImage = null;
let isResizing = false;
let isDragging = false;
let activeHandle = null;
let dragStartX = 0;
let dragStartY = 0;

function handleFiles(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            originalImage = img;
            initializeCropping(img);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

function initializeCropping(img) {
    const canvas = document.getElementById('sourceCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    ctx.drawImage(img, 0, 0);
    canvas.style.display = 'block';
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', drawCrop);
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        isResizing = false;
        isDragging = false;
        activeHandle = null;
    });
}

function startCropping(e) {
    isDrawing = true;
    const rect = e.target.getBoundingClientRect();
    const scaleX = e.target.width / rect.width;
    const scaleY = e.target.height / rect.height;
    
    startX = (e.clientX - rect.left) * scaleX;
    startY = (e.clientY - rect.top) * scaleY;
    
    cropX = startX;
    cropY = startY;
    cropWidth = 0;
    cropHeight = 0;
}

function drawCrop(e) {
    if (!isDrawing && !isResizing && !isDragging) return;
    
    const canvas = document.getElementById('sourceCanvas');
    const ctx = canvas.getContext('2d');
    const rect = e.target.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;
    
    if (isDrawing) {
        cropX = Math.min(startX, currentX);
        cropY = Math.min(startY, currentY);
        cropWidth = Math.abs(currentX - startX);
        cropHeight = Math.abs(currentY - startY);
    } else if (isResizing) {
        const dx = currentX - dragStartX;
        const dy = currentY - dragStartY;
        
        switch(activeHandle) {
            case 'nw':
                cropWidth -= dx;
                cropHeight -= dy;
                cropX += dx;
                cropY += dy;
                break;
            case 'ne':
                cropWidth += dx;
                cropHeight -= dy;
                cropY += dy;
                break;
            case 'sw':
                cropWidth -= dx;
                cropHeight += dy;
                cropX += dx;
                break;
            case 'se':
                cropWidth += dx;
                cropHeight += dy;
                break;
        }
    } else if (isDragging) {
        const dx = currentX - dragStartX;
        const dy = currentY - dragStartY;
        cropX += dx;
        cropY += dy;
    }
    
    dragStartX = currentX;
    dragStartY = currentY;
    
    // Redraw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0);
    
    // Draw crop rectangle
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);
    
    // Draw handles
    const handleSize = 10;
    ctx.fillStyle = '#00ff00';
    
    // Corner handles
    const handles = [
        { x: cropX, y: cropY, cursor: 'nw-resize', name: 'nw' },
        { x: cropX + cropWidth, y: cropY, cursor: 'ne-resize', name: 'ne' },
        { x: cropX, y: cropY + cropHeight, cursor: 'sw-resize', name: 'sw' },
        { x: cropX + cropWidth, y: cropY + cropHeight, cursor: 'se-resize', name: 'se' }
    ];
    
    handles.forEach(handle => {
        ctx.fillRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize);
    });
}
function handleMouseDown(e) {
    const rect = e.target.getBoundingClientRect();
    const scaleX = e.target.width / rect.width;
    const scaleY = e.target.height / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    
    const handleSize = 10;
    const handles = [
        { x: cropX, y: cropY, cursor: 'nw-resize', name: 'nw' },
        { x: cropX + cropWidth, y: cropY, cursor: 'ne-resize', name: 'ne' },
        { x: cropX, y: cropY + cropHeight, cursor: 'sw-resize', name: 'sw' },
        { x: cropX + cropWidth, y: cropY + cropHeight, cursor: 'se-resize', name: 'se' }
    ];
    
    // Check if clicking on a handle
    for (const handle of handles) {
        if (Math.abs(mouseX - handle.x) < handleSize && Math.abs(mouseY - handle.y) < handleSize) {
            isResizing = true;
            activeHandle = handle.name;
            dragStartX = mouseX;
            dragStartY = mouseY;
            return;
        }
    }
    
    // Check if clicking inside crop area
    if (mouseX > cropX && mouseX < cropX + cropWidth && 
        mouseY > cropY && mouseY < cropY + cropHeight) {
        isDragging = true;
        dragStartX = mouseX;
        dragStartY = mouseY;
        return;
    }
    
    // Start new crop
    isDrawing = true;
    startX = mouseX;
    startY = mouseY;
}

function endCropping() {
    isDrawing = false;
}

document.getElementById('confirmCrop').addEventListener('click', () => {
    if (!cropWidth || !cropHeight) return;
    
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    
    const canvasWidth = 1920;
    const canvasHeight = 1080;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    const scale = Math.min(
        (canvasWidth * 0.8) / cropWidth,
        (canvasHeight * 0.8) / cropHeight
    );
    
    const scaledWidth = cropWidth * scale;
    const scaledHeight = cropHeight * scale;
    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;
    
    ctx.drawImage(
        originalImage,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        x,
        y,
        scaledWidth,
        scaledHeight
    );
    
    canvas.style.display = 'block';
});

document.getElementById('drop-area').addEventListener('dragover', (event) => {
    event.preventDefault();
});

document.getElementById('drop-area').addEventListener('drop', (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
});