import React from 'react';
import { useHero } from '../context/RootContext';
import { CATEGORIES, PRODUCTS, LOOKBOOK_SCENE, REVIEWS } from '../data/mockData';
import { HeroCarousel } from '../components/HeroCarousel';
import { TrustBar } from '../components/TrustBar';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { CategoryShowcase } from '../components/CategoryShowcase';
import { ShopTheLook } from '../components/ShopTheLook';
import { CustomerReviews } from '../components/CustomerReviews';
import { InstagramFeed } from '../components/InstagramFeed';
export const HomePage = ({ activeCategory, onSelectCategory, onAddToCart, onToggleWishlist, wishlistIds, searchQuery, onClearSearch, onClickProduct }) => {
    const { heroSlides } = useHero();

    return (<div className="flex-1 animate-fade-in">
      {/* 1. Hero Banner Carousel */}
      <HeroCarousel slides={heroSlides} onSelectCategory={onSelectCategory}/>

      {/* 2. Trust & Value Props Bar */}
      <TrustBar />

      {/* 3. Shop by Category Grid */}
      <CategoryGrid categories={CATEGORIES} onSelectCategory={onSelectCategory}/>

      {/* 4. Featured Products Interactive Section */}
      <ProductGrid products={PRODUCTS} selectedCategory={activeCategory} onSelectCategory={onSelectCategory} onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlistIds={wishlistIds} searchQuery={searchQuery} onClearSearch={onClearSearch} onClickProduct={onClickProduct}/>

      {/* 5. Category Showcase (Alternating Layouts) */}
      <CategoryShowcase onSelectCategory={onSelectCategory}/>

      {/* 6. Interactive Editorial Lookbook ("Shop the Look") */}
      <ShopTheLook scene={LOOKBOOK_SCENE} products={PRODUCTS} onAddToCart={onAddToCart} onClickProduct={onClickProduct}/>

      {/* 7. Customer Reviews & Testimonials */}
      <CustomerReviews reviews={REVIEWS}/>

      {/* 8. Instagram Community Gallery */}
      <InstagramFeed />
    </div>);
};
