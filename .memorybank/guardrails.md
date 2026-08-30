# Frontend Guardrails & Inviolable Non-Regression Rules

## 1. Zero-Regression Policy
- Any change, feature, or bug fix MUST NOT break, degrade, or alter existing customer flows (Browsing, Search, PDP, Quick Add, Cart, Checkout, Wishlist).

## 2. Inviolable Frontend Rules
1. **Static Assets & Port Mapping**: Static uploads are on backend `http://localhost:5000/uploads/...`. ALWAYS use `resolveImageUrl(imgPath)` with loop-safe `onError` fallback to `FALLBACK_PRODUCT_IMAGE`.
2. **Currency & Tax**: Strictly use `₹` (INR) everywhere with tax inclusion notation.
3. **Optimistic UI Quick Add**: `addToCartWithFeedback` MUST fire `showToast` synchronously and immediately (0ms delay) with defensive formatting (`${qty}× ${name} (${size} / ${color})`). Never allow `undefined×`.
4. **Toast Layering**: `<Toast />` container must stay at `z-[99999]` with upward slide animation.
5. **Product Detail Reload Resilience**: `/product/:id` must fetch directly from `/api/products/${id}` with loading skeleton if not found in memory, preventing blinking on reload.
6. **Defensive Normalization**: Always pass API product objects through `normalizeProduct`.
7. **Performance**: Avoid unnecessary component re-renders, retain lazy loading on images, and prevent memory leaks.
