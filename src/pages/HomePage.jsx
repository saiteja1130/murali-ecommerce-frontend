import React from 'react';
import { useHero, useStore } from '../context/RootContext';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBar } from '../components/TrustBar';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { InstagramFeed } from '../components/InstagramFeed';

export const HomePage = ({
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  mainCategories: propMainCategories,
  categories: propCategories,
  products: propProducts,
  searchQuery,
  onClearSearch,
  onClickProduct
}) => {
  const { heroSlides } = useHero();
  const { mainCategories: ctxMainCategories, categories: ctxCategories, products: ctxProducts } = useStore();

  const displayMainCategories = propMainCategories && propMainCategories.length > 0
    ? propMainCategories
    : (ctxMainCategories && ctxMainCategories.length > 0 ? ctxMainCategories : []);

  const displayCategories = propCategories && propCategories.length > 0
    ? propCategories
    : (ctxCategories || []);

  const displayProducts = propProducts && propProducts.length > 0
    ? propProducts
    : (ctxProducts || []);

  // For CategoryGrid on homepage, display Main Categories if present
  const categoryGridItems = displayMainCategories.length > 0 ? displayMainCategories : displayCategories;

  return (
    <div className="flex-1 animate-fade-in">
      <HeroCarousel slides={heroSlides} onSelectCategory={onSelectCategory} />

      <TrustBar />

      {categoryGridItems.length > 0 && (
        <CategoryGrid
          categories={categoryGridItems}
          isMainCategories={displayMainCategories.length > 0}
          onSelectCategory={onSelectCategory}
        />
      )}

      <ProductGrid
        products={displayProducts}
        mainCategories={displayMainCategories}
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

      {categoryGridItems.length > 0 && (
        <CategoryShowcase
          categories={categoryGridItems}
          isMainCategories={displayMainCategories.length > 0}
          onSelectCategory={onSelectCategory}
        />
      )}

      <InstagramFeed />
    </div>
  );
};

export default HomePage;
