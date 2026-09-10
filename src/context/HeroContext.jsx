import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './api';

const HeroContext = createContext(undefined);

export const FALLBACK_HERO_SLIDES = [
  {
    id: 'fallback-hero-1',
    title: 'The Royal Festive & Wedding Edit',
    heading: 'The Royal Festive & Wedding Edit',
    subtitle: 'Handcrafted silhouettes in pure silk, exquisite zari embroidery, and regal heritage hues for every celebration.',
    subheading: 'Handcrafted silhouettes in pure silk, exquisite zari embroidery, and regal heritage hues for every celebration.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Explore Festive Couture',
    cta: 'Explore Festive Couture',
    ctaLink: '/products',
    categorySlug: 'festive',
    tag: 'HAUTE ATELIER EDITORIAL',
    badgeText: 'NEW SEASON 2026',
    order: 0
  },
  {
    id: 'fallback-hero-2',
    title: 'Timeless Elegance & Modern Grace',
    heading: 'Timeless Elegance & Modern Grace',
    subtitle: 'Artisanal designer ensembles curated with precision tailoring, breathable premium fabrics, and radiant detailing.',
    subheading: 'Artisanal designer ensembles curated with precision tailoring, breathable premium fabrics, and radiant detailing.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Shop New Arrivals',
    cta: 'Shop New Arrivals',
    ctaLink: '/products',
    categorySlug: 'women',
    tag: 'GLAM & GLOW SIGNATURE',
    badgeText: 'EXCLUSIVE',
    order: 1
  },
  {
    id: 'fallback-hero-3',
    title: 'Handloom & Artisanal Masterpieces',
    heading: 'Handloom & Artisanal Masterpieces',
    subtitle: 'Indulge in authentic handwoven textures, radiant jewel tones, and opulent ceremonial attire.',
    subheading: 'Indulge in authentic handwoven textures, radiant jewel tones, and opulent ceremonial attire.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Discover Sarees & Ensembles',
    cta: 'Discover Sarees & Ensembles',
    ctaLink: '/products',
    categorySlug: 'sarees',
    tag: 'LIMITED EDITION',
    badgeText: 'HANDCRAFTED',
    order: 2
  },
  {
    id: 'fallback-hero-4',
    title: 'The Little Glamour Kids Couture',
    heading: 'The Little Glamour Kids Couture',
    subtitle: 'Charming festive & party collections tailored for comfort, softness, and vibrant youthful style.',
    subheading: 'Charming festive & party collections tailored for comfort, softness, and vibrant youthful style.',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Shop Kids Edit',
    cta: 'Shop Kids Edit',
    ctaLink: '/products',
    categorySlug: 'kids',
    tag: 'SPECIAL SELECTION',
    badgeText: 'TRENDING',
    order: 3
  }
];

export const HeroProvider = ({ children }) => {
  const [heroSlides, setHeroSlides] = useState(FALLBACK_HERO_SLIDES);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHeroSlides = async () => {
    setIsLoading(true);
    try {
      // Public endpoint returns only active slides sorted by order
      const response = await api.get('/api/hero');
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const mapped = response.data.data.map((slide, index) => ({
          id: slide._id || `slide-${index}`,
          title: slide.title,
          heading: slide.title,
          subtitle: slide.subtitle || '',
          subheading: slide.subtitle || '',
          image: slide.image,
          ctaText: slide.ctaText || 'Explore Collection',
          cta: slide.ctaText || 'Explore Collection',
          ctaLink: slide.ctaLink || '/products',
          categorySlug: slide.ctaLink?.replace(/^\/products\/?/, '') || 'All',
          tag: 'HAUTE ATELIER EDITORIAL',
          badgeText: index === 0 ? 'NEW ARRIVALS' : undefined,
          order: slide.order ?? index
        }));
        setHeroSlides(mapped);
      } else {
        setHeroSlides(FALLBACK_HERO_SLIDES);
      }
    } catch (error) {
      console.warn('Live hero slides fetch unavailable, using fallback slides:', error.message);
      setHeroSlides(FALLBACK_HERO_SLIDES);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSlides();
  }, []);

  return (
    <HeroContext.Provider
      value={{
        heroSlides,
        isLoading,
        refetchHeroSlides: fetchHeroSlides
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
};

export default HeroContext;
