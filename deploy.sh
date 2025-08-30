#!/bin/bash

# ArtSaturated Deployment Script
echo "🎨 ArtSaturated Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the project root directory"
    exit 1
fi

# Check for production environment variables
if [ ! -f ".env.production" ]; then
    echo "⚠️  Warning: .env.production not found"
    echo "   Create .env.production with your live Stripe keys"
fi

echo "📦 Building production package..."

# Clean previous build
rm -rf build/

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Build the frontend
echo "🔨 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build completed successfully!"
    echo "📊 Build stats:"
    du -sh build/
    echo ""
    echo "📁 Build contents:"
    ls -la build/
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Deploy frontend: Upload 'build/' folder to your hosting service"
    echo "2. Deploy backend: Upload 'server/' folder to your server"
    echo "3. Set environment variables in your hosting dashboard"
    echo "4. Update DNS to point to your hosting service"
    echo ""
    echo "Quick deploy options:"
    echo "- Vercel: npx vercel --prod"
    echo "- Netlify: Drag build/ folder to netlify.com"
    echo "- GitHub Pages: npm run deploy (if configured)"
else
    echo "❌ Build failed! Check the error messages above."
    exit 1
fi