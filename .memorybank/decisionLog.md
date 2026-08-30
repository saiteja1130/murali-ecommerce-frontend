# Decision Log (murali-ecommerce-frontend)

## Decision 1: Image URL Normalization
- Centralized `resolveImageUrl` in `src/utils/productAdapter.js` to map static paths to `http://localhost:5000/uploads/...`.

## Decision 2: Currency Standardization
- All prices strictly use `₹` (INR) notation with all taxes included.

## Decision 3: Optimistic Synchronous Toast Dispatch
- `addToCartWithFeedback` calls `showToast` immediately without awaiting background network requests.
