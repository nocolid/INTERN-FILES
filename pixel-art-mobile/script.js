const CANVAS_WIDTH = 25;  // 250px / 10px per pixel
const CANVAS_HEIGHT = 35; // 350px / 10px per pixel

let currentColor = '#000000';
let isDrawing = false;
const canvas = document.getElementById('pixelCanvas');
const colorPicker = document.getElementById('colorPicker');
const colorDisplay = document.getElementById('colorDisplay');
const colorHex = document.getElementById('colorHex');

// Preset color palette
const paletteColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#FFD700', '#4B0082', '#98FB98'
];

// Initialize canvas
function initCanvas() {
    canvas.style.gridTemplateColumns = `repeat(${CANVAS_WIDTH}, 10px)`;
    canvas.innerHTML = '';

    for (let i = 0; i < CANVAS_HEIGHT * CANVAS_WIDTH; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.dataset.index = i;
        pixel.style.backgroundColor = '#FFFFFF';

        pixel.addEventListener('mousedown', startDrawing);
        pixel.addEventListener('mouseover', draw);
        pixel.addEventListener('mouseup', stopDrawing);
        pixel.addEventListener('touchstart', handleTouchStart);
        pixel.addEventListener('touchmove', handleTouchMove);

        canvas.appendChild(pixel);
    }
}

// Initialize palette
function initPalette() {
    const palette = document.getElementById('palette');
    paletteColors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'palette-color';
        colorDiv.style.backgroundColor = color;
        colorDiv.addEventListener('click', () => {
            currentColor = color;
            colorPicker.value = color;
            updateColorDisplay();
            updateActivePalette();
        });
        palette.appendChild(colorDiv);
    });
    updateActivePalette();
}

function updateActivePalette() {
    document.querySelectorAll('.palette-color').forEach(el => {
        el.classList.remove('active');
        if (el.style.backgroundColor === rgbToHex(currentColor)) {
            el.classList.add('active');
        }
    });
}

function rgbToHex(color) {
    if (color.startsWith('#')) return color.toLowerCase();
    const rgb = color.match(/\d+/g);
    return '#' + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
}

function updateColorDisplay() {
    colorDisplay.style.backgroundColor = currentColor;
    colorHex.textContent = currentColor.toUpperCase();
}

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    updateColorDisplay();
    updateActivePalette();
});

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    this.style.backgroundColor = currentColor;
}

function draw(e) {
    if (isDrawing) {
        this.style.backgroundColor = currentColor;
    }
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    isDrawing = true;
    this.style.backgroundColor = currentColor;
}

function handleTouchMove(e) {
    e.preventDefault();
    if (isDrawing) {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('pixel')) {
            element.style.backgroundColor = currentColor;
        }
    }
}

document.addEventListener('mouseup', stopDrawing);
document.addEventListener('touchend', stopDrawing);

function clearCanvas() {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = '#FFFFFF';
    });
}

// Van Gogh "Starry Night" inspired sample (simplified pixel art)
function loadVanGoghSample() {
    const vanGoghPattern = [
        // Sky with stars and swirls (top portion)
        ['#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#ffd700', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#ffd700', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#ffd700', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#ffd700', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#ffd700', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#ffd700', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#2c5f8d'],
        ['#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#fff5cc', '#ffeb99', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#ffd700', '#fff5cc', '#ffeb99', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#ffd700', '#fff5cc', '#ffeb99', '#fff5cc', '#2c5f8d', '#4a7ba7', '#2c5f8d'],
        ['#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#ffd700', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#ffd700', '#fff5cc', '#ffd700', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#ffd700', '#fff5cc', '#ffd700', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d'],
        ['#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#2c5f8d', '#ffd700', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#ffd700', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#2c5f8d', '#ffd700', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7'],
        // Swirling sky
        ['#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d'],
        ['#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#4a7ba7'],
        ['#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#6b9bc3'],
        ['#87ceeb', '#b0e0e6', '#d4f1f4', '#e6f7f9', '#d4f1f4', '#b0e0e6', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#b0e0e6', '#d4f1f4', '#e6f7f9', '#d4f1f4', '#b0e0e6', '#87ceeb', '#b0e0e6', '#d4f1f4', '#e6f7f9', '#d4f1f4', '#b0e0e6', '#87ceeb', '#b0e0e6', '#87ceeb'],
        ['#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#87ceeb', '#6b9bc3'],
        // Moon
        ['#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#ffd700', '#fff5cc', '#ffeb99', '#fff5cc', '#ffd700', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7'],
        ['#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#ffd700', '#fff5cc', '#fffacd', '#fff5cc', '#ffd700', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d'],
        ['#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#ffd700', '#fff5cc', '#fffacd', '#ffeb99', '#fffacd', '#fff5cc', '#ffd700', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f'],
        ['#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#ffd700', '#fff5cc', '#ffeb99', '#fff5cc', '#ffd700', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#4a7ba7', '#2c5f8d', '#1e3a5f', '#ffd700', '#fff5cc', '#ffd700', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7'],
        // Cypress tree (dark green/black)
        ['#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#0d1f2d', '#1a3a2e', '#0d1f2d', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7'],
        ['#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#0d1f2d', '#1a3a2e', '#2d5016', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#2c5f8d', '#1e3a5f', '#0d1f2d', '#1a3a2e', '#2d5016', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f'],
        ['#1e3a5f', '#0d1f2d', '#1a3a2e', '#2d5016', '#3f7d20', '#4a9d2e', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#0d1f2d', '#1a3a2e', '#2d5016', '#3f7d20', '#4a9d2e', '#5cb85c', '#4a9d2e', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f'],
        ['#1a3a2e', '#2d5016', '#3f7d20', '#4a9d2e', '#5cb85c', '#4a9d2e', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f'],
        ['#2d5016', '#3f7d20', '#4a9d2e', '#3f7d20', '#4a9d2e', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#3f7d20', '#2d5016', '#3f7d20', '#2d5016', '#3f7d20', '#2d5016', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f'],
        ['#2d5016', '#1a3a2e', '#2d5016', '#1a3a2e', '#2d5016', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d'],
        ['#1a3a2e', '#0d1f2d', '#1a3a2e', '#0d1f2d', '#1a3a2e', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f'],
        // Village with hills
        ['#0d1f2d', '#1e3a5f', '#0d1f2d', '#1e3a5f', '#0d1f2d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#2c5f8d'],
        ['#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#1e3a5f', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7'],
        ['#2c5f8d', '#4a7ba7', '#6b9bc3', '#4a7ba7', '#2c5f8d', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#b0e0e6', '#d4f1f4', '#b0e0e6', '#87ceeb', '#6b9bc3', '#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3'],
        ['#4a7ba7', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#8b4513', '#654321', '#8b4513', '#654321', '#8b4513', '#654321', '#8b4513', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7', '#8b4513', '#654321', '#8b4513', '#654321', '#8b4513', '#6b9bc3', '#87ceeb', '#6b9bc3', '#4a7ba7'],
        ['#6b9bc3', '#87ceeb', '#b0e0e6', '#87ceeb', '#d2691e', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#87ceeb', '#b0e0e6', '#d2691e', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#87ceeb', '#b0e0e6', '#87ceeb'],
        ['#4a7ba7', '#6b9bc3', '#87ceeb', '#d2691e', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#6b9bc3', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#6b9bc3', '#4a7ba7'],
        // Village buildings
        ['#2c5f8d', '#4a7ba7', '#d2691e', '#8b4513', '#ffd700', '#ffa500', '#ffd700', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#4a7ba7', '#8b4513', '#ffd700', '#ffa500', '#ffd700', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#2c5f8d'],
        ['#1e3a5f', '#d2691e', '#8b4513', '#ffa500', '#ffd700', '#ffa500', '#ffd700', '#ffa500', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e', '#ffa500', '#ffd700', '#ffa500', '#ffd700', '#ffa500', '#8b4513', '#a0522d', '#8b4513', '#d2691e'],
        ['#d2691e', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#d2691e'],
        ['#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513'],
        ['#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d', '#8b4513', '#a0522d']
    ];

    const pixels = document.querySelectorAll('.pixel');
    let index = 0;

    for (let row = 0; row < CANVAS_HEIGHT; row++) {
        for (let col = 0; col < CANVAS_WIDTH; col++) {
            if (row < vanGoghPattern.length && col < vanGoghPattern[row].length) {
                pixels[index].style.backgroundColor = vanGoghPattern[row][col];
            }
            index++;
        }
    }
}

function downloadCanvas() {
    const pixelCanvas = document.getElementById('pixelCanvas');
    const pixels = pixelCanvas.querySelectorAll('.pixel');

    // Create a larger canvas for better quality
    const scale = 20;
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = CANVAS_WIDTH * scale;
    downloadCanvas.height = CANVAS_HEIGHT * scale;
    const ctx = downloadCanvas.getContext('2d');

    let index = 0;
    for (let row = 0; row < CANVAS_HEIGHT; row++) {
        for (let col = 0; col < CANVAS_WIDTH; col++) {
            const color = pixels[index].style.backgroundColor;
            ctx.fillStyle = color;
            ctx.fillRect(col * scale, row * scale, scale, scale);
            index++;
        }
    }

    // Download
    downloadCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pixel-art.png';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// Theme management
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('pixel-art-theme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('pixel-art-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// Initialize
loadTheme();
initCanvas();
initPalette();
updateColorDisplay();

// Load Van Gogh sample on page load
setTimeout(() => {
    loadVanGoghSample();
}, 100);