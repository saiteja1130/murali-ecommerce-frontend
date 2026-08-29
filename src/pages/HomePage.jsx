import React from 'react';
import { useHero, useStore } from '../context/RootContext';
import { REVIEWS } from '../data/mockData';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBar } from '../components/TrustBar';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { CustomerReviews } from '../components/CustomerReviews';
import { InstagramFeed } from '../components/InstagramFeed';

export const HomePage = ({
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  categories: propCategories,
  products: propProducts,
  searchQuery,
  onClearSearch,
  onClickProduct
}) => {
  const { heroSlides } = useHero();
  const { categories: ctxCategories, products: ctxProducts } = useStore();

  const displayCategories = propCategories && propCategories.length > 0
    ? propCategories
    : (ctxCategories || []);

  const displayProducts = propProducts && propProducts.length > 0
    ? propProducts
    : (ctxProducts || []);

  return (
    <div className="flex-1 animate-fade-in">
      <HeroCarousel slides={heroSlides} onSelectCategory={onSelectCategory} />

      <TrustBar />

      {displayCategories.length > 0 && (
        <CategoryGrid categories={displayCategories} onSelectCategory={onSelectCategory} />
      )}

      <ProductGrid
        products={displayProducts}
        categories={displayCategories}
        selectedCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        wishlistIds={wishlistIds}
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
        onClickProduct={onClickProduct}
      />

      {displayCategories.length > 0 && (
        <CategoryShowcase categories={displayCategories} onSelectCategory={onSelectCategory} />
      )}

      <CustomerReviews reviews={REVIEWS} />

      <InstagramFeed />
    </div>
  );
};

export default HomePage;
