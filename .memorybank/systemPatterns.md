# System Patterns (murali-ecommerce-frontend)

## 1. Context Hierarchy
```
RootProvider
 ├── AuthProvider (User token, profile, addresses, authModal)
 ├── CartProvider (Cart items, quantities, promo code, localStorage sync)
 ├── WishlistProvider (Wishlisted product IDs, localStorage sync)
 └── StoreProvider (Unified catalog, active filters, search, toast notifications)
```

## 2. Image Resolution Pattern
- All image URLs pass through `resolveImageUrl(imgPath)`:
  - If relative (`/uploads/...` or `uploads/...`), maps to `http://localhost:5000/uploads/...`.
  - Fallback to `FALLBACK_PRODUCT_IMAGE` on error with loop-safe `onError`.

## 3. Toast Notifications
- Synchronous optimistic trigger via `showToast({ type, title, message, image })`.
- Fixed at `bottom-6 right-6 z-[99999]`.
- Animated with `animate-slide-in-up` defined in `src/index.css`.
