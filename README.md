# Interactive Art Website 🎨✨

An interactive web experience featuring a fog-brushing mechanic with dynamic particle trails. Users can brush away a grayscale overlay to reveal colorful art beneath, while creating magical particle effects that respond to their movement.

## Features

### 🌫️ Core Fog Mechanic
- **Interactive Fog Overlay**: Grayscale layer that users can brush away with their cursor
- **Automatic Regeneration**: Fog gradually regrows after 10 seconds of inactivity
- **Touch Support**: Full mobile and tablet compatibility
- **Responsive Design**: Adapts to all screen sizes

### ✨ Particle Trail System (NEW!)
- **Dynamic Particles**: Glowing particles spawn along the brush path
- **Velocity-Responsive**: Particle intensity increases with faster cursor movement
- **Physics Simulation**: Particles drift with subtle gravity and friction effects
- **Colorful Effects**: Random vibrant colors create a magical painting experience
- **Smooth Animation**: 60fps particle system with optimized performance

## Technology Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **HTML5 Canvas** for fog and particle effects
- **Webpack** for bundling (no Vite per user preference)
- **Custom Physics Engine** for particle simulation

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd interactive-art-website

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production
```bash
npm run build
```

The build outputs to the `dist/` directory and can be served by any static web server.

## Project Structure

```
src/
├── App.tsx                    # Main application component
├── index.tsx                  # React entry point
├── index.css                  # Global styles and Tailwind imports
└── components/
    ├── SaturateEffect.tsx     # Core fog brushing mechanic
    └── ParticleSystem.tsx     # Dynamic particle trail system
```

## Usage

1. **Brush the Fog**: Click and drag to brush away the grayscale overlay
2. **Watch the Particles**: Observe colorful particles following your cursor
3. **Experiment with Speed**: Move faster to create more intense particle effects
4. **Wait for Regeneration**: Stop interacting to watch the fog slowly return

## Upcoming Features

The project roadmap includes two additional interactive layers:

### 🎵 Sound-Reactive Fog Patterns
- Microphone input analysis for dynamic fog behavior
- Audio-responsive particle effects
- Multiple frequency response modes

### 🧠 Memory Heat Map System  
- Persistent tracking of user interaction patterns
- "Memory zones" with special fog behavior
- Heat map visualization of frequently brushed areas

## Development

### Architecture
- **Modular Design**: Each feature is a separate, reusable component
- **Canvas Layering**: Multiple canvas layers for fog, particles, and future effects
- **Performance Optimized**: Efficient particle management and canvas operations
- **TypeScript**: Full type safety for better development experience

### Canvas Optimization
- Particle pooling to reduce garbage collection
- Efficient render loops with `requestAnimationFrame`
- Separate canvas layers to minimize redraws
- Velocity-based particle spawning for performance

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Features Used**: HTML5 Canvas, requestAnimationFrame, touch events

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-interaction`
3. Commit changes: `git commit -am 'Add new interactive feature'`
4. Push to branch: `git push origin feature/new-interaction`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Experience the magic of interactive art - brush away the fog and paint with light!** ✨