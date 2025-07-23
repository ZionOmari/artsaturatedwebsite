# ArtSaturated - Zion Omari's Creative Portfolio

> A vibrant, interactive portfolio + merch site showcasing art, music, and creative identity. Where movement meets medium, where sound becomes sight.

## 🎨 About ArtSaturated

ArtSaturated is the digital home of **Zion Omari**, a creative engineer who transforms movement into visual art and sound into color. This web app serves as a portfolio, gallery, and invitation to Zion's world of creative expression.

### Core Philosophy
- **From Movement to Medium**: Transforming dance energy into visual art
- **Crayon-Stained Soundscapes**: Where every beat is a brushstroke
- **Creative Engineering**: Building bridges between different art forms

## 🚀 Features

### ✨ Current Features
- **Hero Section**: Bold introduction with animated background
- **About Section**: Personal story framed as a manifesto/mission
- **Gallery**: Interactive display of artwork with lightbox modal
- **Merch Preview**: Placeholder for future dropshipping integration
- **Connect Section**: Social links, email, and mailing list signup
- **Responsive Design**: Beautiful on all devices
- **Smooth Animations**: Powered by Framer Motion

### 🎯 Planned Features
- Shopify/Printful integration for merch store
- Real artwork gallery with actual pieces
- Music integration and audio-visual experiences
- Blog/updates section
- Collaboration inquiry system

## 🎨 Design System

### Color Palette (Crayola-Inspired)
- **Red**: `#FF6B6B`
- **Orange**: `#FFA500`
- **Yellow**: `#FFD93D`
- **Pink**: `#FF69B4`
- **Purple**: `#9B59B6`
- **Blue**: `#3498DB`
- **Cyan**: `#00CED1`
- **Brown**: `#8B4513`
- **Black**: `#000000`
- **White**: `#FFFFFF`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Fonts**: Google Fonts (Inter)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd artsaturatedwebsite

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
artsaturatedwebsite/
├── src/
│   ├── components/
│   │   ├── Hero.tsx           # Hero section with animated background
│   │   ├── About.tsx          # Personal story and manifesto
│   │   ├── Merch.tsx          # Merchandise preview
│   │   ├── Gallery.tsx        # Artwork gallery with lightbox
│   │   ├── Connect.tsx        # Social links and mailing list
│   │   └── Navigation.tsx     # Responsive navigation
│   ├── App.tsx                # Main app component
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles and Tailwind
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎨 Customization

### Adding New Artwork
1. Update the `artwork` array in `src/components/Gallery.tsx`
2. Add your image to the `public/` directory
3. Update the image path in the artwork object

### Updating Colors
1. Modify the color values in `tailwind.config.js`
2. Update gradient classes in `src/index.css`

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Update navigation links in `src/components/Navigation.tsx`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

### Other Platforms
The app can be deployed to any static hosting platform that supports React applications.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

© 2024 Zion Omari / ArtSaturated. All rights reserved.

## 📞 Contact

- **Instagram**: [@artsaturated](https://instagram.com/artsaturated)
- **Email**: zion@artsaturated.com
- **Website**: [artsaturated.com](https://artsaturated.com)

---

*Made with ❤️ by Zion Omari*