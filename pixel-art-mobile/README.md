# Pixel Art Canvas Maker

A mobile-optimized pixel art canvas maker application with a retro 8-bit gaming aesthetic.

## Features

### Drawing Tools
- **25x35 pixel grid** (250x350px canvas) for creating pixel art
- **Color picker** with hex value display
- **16-color quick palette** for fast color selection
- **Click and drag** drawing support
- **Touch support** for mobile devices

### Sample Art
- Pre-loaded **Van Gogh "Starry Night"** inspired pixel art
- Reload the sample anytime with the Van Gogh Sample button

### Theme Support
- **Light Mode** - Cream white palette with soft pastel colors and warm brown borders
- **Dark Mode** - Dark retro gaming palette with neon accents
- Theme preference saved in `localStorage` and persists across sessions

### Export
- **Download as PNG** - Exports your artwork at 20x scale for high quality output

### Retro Design
- **Press Start 2P** pixel font
- CRT scanline animation overlay
- 3D pixel-style button press effects
- Glitch animation on title text
- Pixel corner decorations
- Arcade cabinet-inspired layered borders

## File Structure

```
pixel-art-mobile/
├── index.html    # HTML structure and layout
├── style.css     # Retro 8-bit styling with light/dark theme variables
├── script.js     # Canvas logic, drawing, theme management, and Van Gogh sample data
└── README.md
```

## Getting Started

1. Open `index.html` in any modern web browser
2. Select a color from the palette or use the color picker
3. Click or tap on the canvas pixels to draw
4. Use the buttons to clear, load sample art, switch themes, or download your creation

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Grid, Animations)
- Vanilla JavaScript
- Google Fonts (Press Start 2P)