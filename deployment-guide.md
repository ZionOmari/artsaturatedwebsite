# ArtSaturated Deployment Guide

## 📦 Package Contents

Your ArtSaturated website is now packaged and ready for deployment. The project consists of:

### Frontend (React App)
- **Built Location**: `build/` directory
- **Size**: ~52MB (includes images and assets)
- **Technology**: React + TypeScript + Tailwind CSS
- **Entry Point**: `build/index.html`

### Backend (Optional)
- **Location**: `server/` directory  
- **Technology**: Node.js + Express + MongoDB
- **Features**: Stripe payment processing, order management

## 🚀 Deployment Options

### Option 1: Frontend Only (Recommended for Start)
Deploy just the frontend with static hosting services:

#### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# From project root
vercel

# Follow prompts, deploy build folder
```

**Environment Variables to Set in Vercel Dashboard:**
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your live Stripe publishable key
- `REACT_APP_SITE_URL`: Your production domain

#### **Netlify**
```bash
# Option A: Drag and drop build folder to netlify.com
# Option B: Connect GitHub repo and set build command to "npm run build"
```

#### **GitHub Pages**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Option 2: Full Stack Deployment

#### **Railway (Easy Full Stack)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

#### **Heroku + Vercel**
- Frontend on Vercel (free)
- Backend on Heroku (paid tiers available)

#### **VPS/DigitalOcean**
- Full control, requires server management
- Use PM2 for Node.js process management

## ⚙️ Production Configuration

### Frontend Environment Variables
Create `.env.production` file:
```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key
REACT_APP_API_URL=https://your-backend-api.com
REACT_APP_SITE_URL=https://artsaturated.com
```

### Backend Environment Variables
Update `server/.env` for production:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/artsaturated
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
FRONTEND_URL=https://artsaturated.com
JWT_SECRET=your_secure_random_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@artsaturated.com
```

## 🔧 Build Commands

### Development
```bash
npm run dev          # Start both frontend and backend
npm run client       # Frontend only
npm run server       # Backend only
```

### Production
```bash
npm run build        # Build frontend
npm start            # Start production server (if using backend)
```

## 📊 Build Analysis

### Current Build Stats
- **Main JS Bundle**: 61.94 kB (gzipped)
- **CSS Bundle**: 5.23 kB (gzipped)
- **Total Size**: ~52MB (includes images)
- **Load Time**: Fast (optimized by Create React App)

### Performance Optimization Tips
1. **Image Optimization**: Consider converting images to WebP format
2. **Code Splitting**: Already handled by Create React App
3. **Caching**: Set appropriate cache headers for static assets
4. **CDN**: Use a CDN for faster global delivery

## 🛡️ Security Checklist

### Before Going Live:
- [ ] Replace all test Stripe keys with live keys
- [ ] Set strong JWT secret (use random 64-character string)
- [ ] Configure CORS properly for your domain
- [ ] Enable HTTPS/SSL certificate
- [ ] Set up Stripe webhooks for order processing
- [ ] Update email configuration with real credentials
- [ ] Remove debug logs and console statements

## 🌐 Domain Setup

### DNS Configuration
Point your domain to your hosting provider:
- **A Record**: Point to your server IP (if self-hosting)
- **CNAME**: Point to hosting provider domain (Vercel/Netlify)

### SSL Certificate
Most hosting providers (Vercel, Netlify) provide automatic SSL certificates.

## 📈 Post-Deployment

### Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor payment processing in Stripe Dashboard
- Set up uptime monitoring

### Analytics
- Google Analytics integration
- Stripe Dashboard for sales analytics
- Monitor Core Web Vitals

## 🆘 Troubleshooting

### Common Issues
1. **White Screen**: Check console for JavaScript errors
2. **Stripe Not Loading**: Verify environment variables
3. **Images Not Loading**: Check asset paths and hosting setup
4. **CORS Errors**: Configure backend CORS for your domain

### Debug Commands
```bash
# Test production build locally
npx serve -s build

# Check environment variables
echo $REACT_APP_STRIPE_PUBLISHABLE_KEY

# Validate build
npm run build 2>&1 | grep -i error
```

---

**Ready to launch your ArtSaturated experience! 🎨**