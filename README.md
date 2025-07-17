# Art Saturated Website

A modern, interactive art portfolio website built with React and TypeScript, featuring comprehensive grayscale effects and responsive design.

## 🎨 Features

- **Interactive Grayscale Toggle**: Switch between color and grayscale modes site-wide
- **Dynamic Image Effects**: Hover-to-reveal colors in grayscale mode
- **Responsive Design**: Optimized for all screen sizes
- **Modern UI/UX**: Built with Tailwind CSS for beautiful, accessible design
- **TypeScript Support**: Type-safe development experience
- **Performance Optimized**: CSS filter-based effects with hardware acceleration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🎯 Grayscale Features

### Global Toggle
- Click the **"⚫ Grayscale Mode"** button in the navigation to toggle site-wide grayscale effects
- The button changes appearance to reflect the current mode

### Interactive Elements
- **Gallery Images**: Hover over images in grayscale mode to reveal colors
- **Background Images**: Hero section background adapts to grayscale mode
- **UI Components**: Buttons, forms, and other elements adapt their styling

### Additional Controls
- **50% Grayscale**: Partial grayscale effect for subtle artistic presentation
- **Animated Effects**: Smooth transitions between color and grayscale states

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx    # Navigation with grayscale toggle
│   ├── Hero.tsx         # Hero section with background effects
│   ├── Gallery.tsx      # Image gallery with hover effects
│   ├── About.tsx        # About section with adaptive styling
│   ├── Merch.tsx        # Merchandise with product image effects
│   └── Connect.tsx      # Contact form with theme adaptation
├── App.tsx              # Main app component with state management
├── index.tsx           # React entry point
└── index.css           # Global styles and grayscale utilities
```

## 🎨 Customization

### Adding Grayscale to New Components

```typescript
interface ComponentProps {
  grayscaleMode: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ grayscaleMode }) => {
  return (
    <div className={grayscaleMode ? 'grayscale-effect' : ''}>
      {/* Your content */}
    </div>
  );
};
```

### Custom CSS Effects

```css
.custom-grayscale {
  filter: grayscale(100%) contrast(1.2) brightness(0.8);
  transition: filter 0.5s ease;
}
```

## 🛠 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Filters** - Hardware-accelerated visual effects
- **Responsive Design** - Mobile-first approach

## 📖 Documentation

For detailed implementation guide, see [GRAYSCALE_IMPLEMENTATION.md](./GRAYSCALE_IMPLEMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Key Accomplishments

- ✅ Complete grayscale effect system
- ✅ React TypeScript architecture
- ✅ Responsive design implementation
- ✅ Accessibility considerations
- ✅ Performance optimizations
- ✅ Interactive user experience
- ✅ Comprehensive documentation

---

**Built with ❤️ for the art community**