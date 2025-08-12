#!/bin/bash

# Numero App Deployment Script
echo "🔮 Deploying Numero - AI-Powered Numerology Calculator"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Build the application
print_status "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    print_error "dist directory not found after build!"
    exit 1
fi

print_status "Build output:"
ls -la dist/

# Deployment options
echo ""
echo "Choose deployment option:"
echo "1) Vercel"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Docker"
echo "5) Local preview"
echo "6) All platforms"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        print_status "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            print_error "Vercel CLI not found. Install with: npm i -g vercel"
        fi
        ;;
    2)
        print_status "Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            print_error "Netlify CLI not found. Install with: npm install -g netlify-cli"
        fi
        ;;
    3)
        print_status "Preparing for GitHub Pages deployment..."
        print_warning "Make sure you have:"
        print_warning "1. Pushed your code to GitHub"
        print_warning "2. Enabled GitHub Pages in repository settings"
        print_warning "3. Set source to 'GitHub Actions'"
        echo ""
        read -p "Press Enter to continue with git push..."
        git add .
        git commit -m "Deploy to GitHub Pages"
        git push origin main
        print_success "Code pushed to GitHub. GitHub Actions will handle deployment."
        ;;
    4)
        print_status "Building Docker image..."
        if command -v docker &> /dev/null; then
            docker build -t numero-app .
            if [ $? -eq 0 ]; then
                print_success "Docker image built successfully!"
                print_status "To run the container:"
                echo "docker run -p 80:80 numero-app"
                echo "Or use docker-compose: docker-compose up -d"
            else
                print_error "Docker build failed!"
            fi
        else
            print_error "Docker not found. Please install Docker first."
        fi
        ;;
    5)
        print_status "Starting local preview..."
        npm run preview
        ;;
    6)
        print_status "Deploying to all platforms..."
        
        # Vercel
        if command -v vercel &> /dev/null; then
            print_status "Deploying to Vercel..."
            vercel --prod
        fi
        
        # Netlify
        if command -v netlify &> /dev/null; then
            print_status "Deploying to Netlify..."
            netlify deploy --prod --dir=dist
        fi
        
        # Docker
        if command -v docker &> /dev/null; then
            print_status "Building Docker image..."
            docker build -t numero-app .
        fi
        
        print_status "GitHub Pages: Push your code to trigger deployment"
        ;;
    *)
        print_error "Invalid choice!"
        exit 1
        ;;
esac

print_success "Deployment process completed!"
echo ""
print_status "Your app is now ready for production! 🚀" 