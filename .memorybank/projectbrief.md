# Project Brief: Frontend Storefront (murali-ecommerce-frontend)

## 1. Overview
Customer-facing luxury e-commerce web application.
- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS v4 + Vanilla CSS animations
- **Port**: `3000`
- **Backend Service**: Connects to `http://localhost:5000`

## 2. Key Pages & Features
- `/`: Homepage with Hero carousel, Category showcase, and Featured Products.
- `/products` & `/products/:category`: Full product catalog with multi-filter sidebar (dual-thumb price slider, department, category, size, color, badge).
- `/product/:id`: Single product detail view with multi-image carousel, variant selectors, and direct API fallback on reload.
- `/cart`: Shopping cart with promo codes and tax calculations.
- `/checkout`: Multi-step checkout with address selection and payment options.
- `/wishlist`: Saved items with one-click move to cart.
