# Water Physics Integration Guide

## 🌊 What You Just Got

I've created a beautiful water physics system using HTML5 Canvas that implements:

- **3-layer canvas system** (your preferred approach!)
- **Realistic water physics** using a simple but powerful equation
- **Mouse/touch interactions** for creating ripples
- **Cursor clearing effect** for the grey overlay
- **60fps performance** even on slower devices

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import WaterEffect from './components/WaterEffect';

function MyPage() {
  return (
    <div>
      <WaterEffect width={800} height={600} />
    </div>
  );
}
```

### 2. With Custom Styling

```tsx
<WaterEffect 
  width={600} 
  height={400} 
  className="rounded-lg shadow-xl border-2 border-blue-300"
/>
```

### 3. Multiple Water Effects

```tsx
function WaterShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <WaterEffect width={400} height={300} />
      <WaterEffect width={400} height={300} />
    </div>
  );
}
```

## 🎯 How It Works

### The Magic Physics Equation
```javascript
// This single line creates realistic water waves!
const newHeight = ((north + south + east + west) * 0.5 - previousHeight) * 0.99;
```

### 3-Layer Canvas System
1. **Grey Layer (Background)** - Your gradient background with cursor clearing
2. **Water Layer (Physics)** - The interactive water simulation  
3. **Cursor Layer (Top)** - Reserved for additional effects

### Performance Features
- **Double buffering** for smooth 60fps animation
- **Optimized rendering** using ImageData for pixel-level control
- **Memory efficient** using Float32Arrays
- **Touch friendly** works on mobile devices

## 🎨 Customization Options

### Adjust Water Properties

You can modify these values in `WaterEffect.tsx`:

```javascript
// In updateWaterPhysics function
const newHeight = ((north + south + east + west) * 0.5 - previousBuffer[i]) * 0.99;
//                                                                           ^^^^ 
//                                                                     Damping factor
//                                                               0.99 = normal waves
//                                                               0.95 = calmer water  
//                                                               0.999 = more energetic

// In createRipple function
const intensity = 8.0;  // Ripple strength (1-20)
const radius = 15;      // Ripple size (5-50)

// In renderWater function
data[pixelIndex + 3] = 180;  // Water transparency (0-255)
```

### Change Water Colors

```javascript
// In renderWater function
data[pixelIndex] = 0;                    // Red component
data[pixelIndex + 1] = intensity * 0.3;  // Green component  
data[pixelIndex + 2] = intensity;        // Blue component

// For different water colors:
// Tropical: R=0, G=intensity*0.8, B=intensity  
// Deep sea: R=0, G=intensity*0.2, B=intensity*0.8
// Pond: R=intensity*0.2, G=intensity*0.6, B=intensity*0.4
```

### Adjust Cursor Clearing

```javascript
// In clearGreyOverlay function
const radius = 30;  // Size of cleared area (10-100)

// For different clearing effects:
// ctx.globalCompositeOperation = 'destination-out';  // Cut out holes
// ctx.globalCompositeOperation = 'multiply';         // Darken effect  
// ctx.globalCompositeOperation = 'overlay';          // Blend effect
```

## 🔧 Advanced Features

### Add Continuous Ripples

```javascript
// Add this to useEffect for automatic ripples
const interval = setInterval(() => {
  createRipple(
    Math.random() * width, 
    Math.random() * height, 
    2 + Math.random() * 3
  );
}, 2000);

return () => clearInterval(interval);
```

### Multiple Ripple Sources

```javascript
// In handleInteraction, create multiple ripples
const createMultiRipple = (x: number, y: number) => {
  createRipple(x, y, 8);
  setTimeout(() => createRipple(x + 20, y, 4), 100);
  setTimeout(() => createRipple(x - 20, y, 4), 150);
};
```

### Dynamic Background

```javascript
// In initGreyCanvas, add animated background
const animateBackground = () => {
  const time = Date.now() * 0.001;
  const gradient = ctx.createRadialGradient(
    width/2 + Math.sin(time) * 50, 
    height/2 + Math.cos(time) * 30, 0,
    width/2, height/2, Math.max(width, height)
  );
  gradient.addColorStop(0, '#f0f0f0');
  gradient.addColorStop(1, '#d0d0d0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};
```

## 📱 Mobile Optimization

The component already includes:
- Touch event support
- Responsive canvas sizing
- Performance optimizations for mobile GPUs

For even better mobile performance:

```tsx
// Reduce resolution on mobile
const isMobile = window.innerWidth < 768;
const effectiveWidth = isMobile ? width * 0.7 : width;
const effectiveHeight = isMobile ? height * 0.7 : height;

<WaterEffect width={effectiveWidth} height={effectiveHeight} />
```

## 🎮 Integration Examples

### In a Game UI
```tsx
<div className="game-hud">
  <WaterEffect width={200} height={150} className="minimap-water" />
  <div className="controls">...</div>
</div>
```

### As Background Effect  
```tsx
<div className="relative">
  <WaterEffect width={1200} height={800} className="absolute inset-0 -z-10" />
  <div className="relative z-10 content">
    <h1>Your Content Here</h1>
  </div>
</div>
```

### Interactive Art Installation
```tsx
<WaterEffect 
  width={window.innerWidth} 
  height={window.innerHeight} 
  className="fixed inset-0"
/>
```

## 🚨 Troubleshooting

### Performance Issues?
- Reduce canvas size: Use 400x300 instead of 800x600
- Lower frame rate: Change `requestAnimationFrame` to `setTimeout(..., 33)` for 30fps
- Reduce ripple radius from 15 to 10

### Water Too Active?
- Increase damping: Change 0.99 to 0.95
- Reduce ripple intensity from 8.0 to 4.0

### Need Calmer Water?
- Increase damping: Change 0.99 to 0.999
- Add random gentle ripples instead of click-based ones

## 🎉 Next Steps

1. **Test it out** - Import and use the WaterEffect component
2. **Customize colors** - Match your brand/theme
3. **Adjust physics** - Tweak damping and ripple settings
4. **Add features** - Try the advanced examples above
5. **Optimize** - Fine-tune for your target devices

The water physics system is designed to be simple but powerful. You now have a foundation that can create everything from calm ponds to active ocean surfaces!

**Happy coding!** 🌊✨