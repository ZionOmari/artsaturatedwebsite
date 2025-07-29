# ArtSaturated - Zion Omari's Creative Portfolio

> A vibrant, interactive portfolio + e-commerce site showcasing art, music, and creative identity. Where movement meets medium, where sound becomes sight.

## 🎨 About ArtSaturated

ArtSaturated is the digital home of **Zion Omari**, a creative engineer who transforms movement into visual art and sound into color. This web app serves as a portfolio, gallery, and fully functional e-commerce store powered by Stripe.

### Core Philosophy
- **From Movement to Medium**: Transforming dance energy into visual art
- **Crayon-Stained Soundscapes**: Where every beat is a brushstroke
- **Creative Engineering**: Building bridges between different art forms

## 🚀 Features

### ✨ Current Features
- **Interactive Hero**: "Saturate Effect" with cursor-driven canvas clearing
- **About Section**: Personal story framed as a manifesto/mission
- **Gallery**: Interactive display of artwork with lightbox modal
- **🛒 E-Commerce Store**: Full Stripe integration with black & yellow styling
  - Secure checkout with credit card processing
  - Customer information collection
  - Order confirmation and success handling
  - Professional payment forms with validation
- **Connect Section**: Social links, email, and mailing list signup
- **Responsive Design**: Beautiful on all devices
- **Smooth Animations**: Powered by React transitions

### 🎯 Planned Features
- Backend API for order processing
- Inventory management system
- Email order confirmations
- Customer order history
- Real artwork gallery expansion
- Music integration and audio-visual experiences

## 🛒 E-Commerce Integration

### Stripe Features
- **Secure Payments**: PCI-compliant credit card processing
- **Customer Data**: Name, email, and shipping address collection
- **Order Summary**: Clear product and pricing display
- **Error Handling**: User-friendly payment error messages
- **Success Flow**: Order confirmation with next steps

### Design System
- **Black Background**: Professional, gallery-like appearance
- **Yellow Accents**: High-contrast, attention-grabbing highlights
- **Clean Forms**: Intuitive input fields with focus states
- **Smooth Interactions**: Hover effects and transitions

## 🎨 Design System

### Color Palette
- **Primary Yellow**: `#FDE047` (yellow-400)
- **Accent Black**: `#000000`
- **Gray Scale**: `#111827` to `#9CA3AF`
- **Crayola-Inspired**: `#FF6B6B`, `#FFA500`, `#FFD93D`, `#FF69B4`, `#9B59B6`, `#3498DB`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Create React App
- **Styling**: Tailwind CSS
- **Payment Processing**: Stripe + @stripe/react-stripe-js
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Fonts**: Google Fonts (Inter)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Stripe account (for payment processing)

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd artsaturatedwebsite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Stripe keys and other configuration

# Start development server
npm run client
```

The app will be available at `http://localhost:3001`

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Add your publishable key to `.env`:
   ```
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
4. For production, use live keys and enable webhooks for order processing

### Available Scripts
```bash
npm run client       # Start development server
npm run dev          # Start both client and server (if using backend)
npm run build        # Build for production
npm run test         # Run tests
```

## 📁 Project Structure

```
artsaturatedwebsite/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Interactive hero with Saturate Effect
│   │   ├── About.tsx             # Personal story and manifesto
│   │   ├── Merch.tsx             # E-commerce product catalog
│   │   ├── StripeCheckout.tsx    # Payment processing component
│   │   ├── SaturateEffect.tsx    # Interactive canvas effect
│   │   ├── Gallery.tsx           # Artwork gallery with lightbox
│   │   ├── Connect.tsx           # Social links and mailing list
│   │   └── Navigation.tsx        # Responsive navigation
│   ├── pages/
│   │   ├── Home.tsx              # Main landing page
│   │   └── Shop.tsx              # Dedicated shop page
│   ├── App.tsx                   # Main app component with routing
│   ├── index.tsx                 # App entry point
│   └── index.css                 # Global styles and Tailwind
├── public/
│   └── assets/images/            # Product and artwork images
├── .env.example                  # Environment variable template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
└── README.md                     # This file
```

## 🛒 E-Commerce Usage

### Adding Products
1. Update the product arrays in `src/components/Merch.tsx`:
   ```typescript
   const newProduct: Product = {
     id: 'unique-id',
     name: 'Product Name',
     price: 25.00,
     description: 'Product description',
     image: '/path/to/image.jpg',
     category: 'Category'
   };
   ```

2. Add product images to `public/assets/images/`

### Customizing Checkout
- Modify `src/components/StripeCheckout.tsx` for custom fields
- Update styling in the component's Tailwind classes
- Add validation or additional payment methods as needed

## 🎨 Customization

### Updating Colors
1. Modify color values in `tailwind.config.js`
2. Update component classes in `src/components/`
3. Adjust gradient classes in `src/index.css`

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `src/pages/Home.tsx`
3. Update navigation links in `src/components/Navigation.tsx`

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
npm run build

# Deploy the build folder to Netlify
# Set environment variables in Netlify dashboard
```

### Environment Variables for Production
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your live Stripe publishable key
- `REACT_APP_API_URL`: Your backend API URL (if using)
- `REACT_APP_SITE_URL`: Your production domain

## 🔒 Security Notes

- Never commit your `.env` file with real keys
- Use Stripe's test keys during development
- Implement webhook verification for production order processing
- Consider adding rate limiting and CSRF protection

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