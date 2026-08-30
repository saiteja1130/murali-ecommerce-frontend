# Frontend Agent Instructions & Strict Non-Regression Mandate

Customer-facing e-commerce storefront (`murali-ecommerce-frontend`) built with **React 19**, **Vite**, **TailwindCSS v4**, and **React Router**.

---

## 🚨 MANDATORY ZERO-REGRESSION POLICY
**No change, enhancement, or bug fix may break, degrade, or alter existing functionality or performance.**

### Inviolable Frontend Rules:
1. **Ports & Static Uploads**: Backend is on port `5000`. ALL images must use `resolveImageUrl(imgPath)` and loop-safe `onError={(e) => { if (e.currentTarget.src !== FALLBACK_PRODUCT_IMAGE) e.currentTarget.src = FALLBACK_PRODUCT_IMAGE; }}`.
2. **Currency**: Strictly Indian Rupee (`₹`) with tax-inclusive labels.
3. **Optimistic Toast Notifications**: `addToCartWithFeedback` must call `showToast` synchronously and immediately (0ms delay) with clean formatting (`${qty}× ${name} (${size} / ${color})`). Container at `z-[99999]`.
4. **Direct Product Reload Handling**: Direct load/refresh at `/product/:id` fetches from `/api/products/${id}` with loading skeleton, eliminating blinking.
5. **Defensive Normalization**: Always use `normalizeProduct` on incoming catalog items.
6. **State & Context Separation**: Maintain `AuthProvider`, `CartProvider`, `WishlistProvider`, and `StoreProvider` boundaries.

Refer to `.memorybank/guardrails.md` for complete rules.
