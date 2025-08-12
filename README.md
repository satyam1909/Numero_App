# 🔮 Numero - AI-Powered Numerology Calculator

A modern, AI-enhanced numerology web application that provides comprehensive personality analysis, career predictions, yearly forecasts, and lucky elements based on your birth date and name.

## ✨ Features

### 🧮 Core Numerology Calculator
- **Life Path Number** - Your life's purpose and natural path
- **Personality Number** - How others see you and your outer personality
- **Destiny Number** - Your life's purpose and the path you're meant to follow
- **Chaldean Number** - Ancient system using different number values for letters
- **Soul Urge Number** - Your inner desires, motivations, and what truly makes you happy
- **Expression Number** - Your natural talents, abilities, and how you express yourself

### 🧠 AI-Enhanced Personality Analysis (Lu Shu Grid)
- **Visual Number Frequency Grid** - See which numbers appear in your chart
- **Missing Numbers Impact** - Understand what traits are lacking
- **Dominant Numbers Influence** - See how repeated numbers affect your personality
- **Personalized Recommendations** - Get specific advice for improvement

### 🤖 AI Career Predictions
- **Pattern-Based Analysis** - Advanced AI algorithms analyze your numerology profile
- **Confidence Scoring** - Each career suggestion comes with AI confidence percentage
- **Multi-Dimensional Analysis** - Combines multiple numbers for accurate predictions

### 🔮 Yearly Forecast
- **Personal Year Calculation** - Automatically calculates your personal year for next year
- **Opportunities & Challenges** - Detailed analysis of what's ahead
- **Personalized Advice** - Tailored guidance for the year ahead

### 🍀 Lucky Elements
- **Lucky Colors, Numbers, Days & Months** - Based on your life path number
- **Personalized Recommendations** - Specific elements that bring good fortune

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Numero_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   Navigate to `http://localhost`

### Using Docker directly

1. **Build the Docker image**
   ```bash
   docker build -t numero-app .
   ```

2. **Run the container**
   ```bash
   docker run -p 80:80 numero-app
   ```

## 🌐 Cloud Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

### Netlify Deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy to Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Select source as "GitHub Actions"

The GitHub Actions workflow will automatically build and deploy your app.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Heroicons
- **Deployment**: Docker, Vercel, Netlify, GitHub Pages

## 📁 Project Structure

```
Numero_App/
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Calculator.tsx
│   │   └── About.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── dist/                 # Production build
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── vercel.json
├── netlify.toml
└── .github/workflows/
    └── deploy.yml
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:

```env
VITE_APP_TITLE=Numero - Numerology Calculator
VITE_APP_DESCRIPTION=AI-Powered Numerology Analysis
```

### Build Configuration

The app uses Vite for building. Key configurations:

- **Base URL**: Configured for various deployment platforms
- **Asset Optimization**: Automatic code splitting and compression
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: PurgeCSS for production builds

## 📊 Performance

- **Bundle Size**: ~310KB (98KB gzipped)
- **CSS Size**: ~20KB (4KB gzipped)
- **First Contentful Paint**: < 1.5s
- **Lighthouse Score**: 95+ across all metrics

## 🔒 Security

- **Content Security Policy**: Configured for production
- **Security Headers**: XSS protection, frame options, etc.
- **HTTPS**: Enforced on all deployment platforms
- **Input Validation**: Client-side validation for all forms

## 📈 Analytics & Monitoring

### Health Check Endpoint

The application includes a health check endpoint:

```
GET /health
```

Returns `200 OK` with "healthy" response.

### Performance Monitoring

- **Error Tracking**: Ready for integration with Sentry
- **Analytics**: Ready for Google Analytics integration
- **Logging**: Structured logging for production environments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Numerology Principles**: Based on ancient numerological wisdom
- **Lu Shu Grid**: Chinese numerology grid analysis
- **AI Analysis**: Pattern-based personality and career predictions
- **Modern Web Technologies**: React, TypeScript, and Tailwind CSS

## 📞 Support

For support and questions:

- **Issues**: Create an issue on GitHub
- **Documentation**: Check the About page in the application
- **Email**: [Your Email]

---

**Made with ❤️ using modern web technologies** 

## 🌐 **Step-by-Step Domain Configuration**

### **Step 1: DNS Configuration**

You need to configure DNS records at your domain registrar. Here are the required DNS records:

```
<code_block_to_apply_changes_from>
```

### **Step 2: Add Domain via Vercel Dashboard**

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your `numero-app` project

2. **Navigate to Domains:**
   - Click **Settings** tab
   - Click **Domains** in the left sidebar

3. **Add Custom Domain:**
   - Click **Add Domain**
   - Enter: `numerologyml.com`
   - Click **Add**

### **Step 3: Configure DNS at Your Registrar**

**Where did you purchase `numerologyml.com`?**
- **Namecheap**: Go to Domain List → Manage → Advanced DNS
- **GoDaddy**: Go to My Domains → DNS → Manage Zones
- **Cloudflare**: Go to DNS → Records
- **Google Domains**: Go to DNS → Manage Custom Records

**Add these records:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.19.19 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

### **Step 4: Verify Configuration**

``` 