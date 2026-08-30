import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
export const HeroCarousel = ({ slides = [], onSelectCategory }) => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);
  const duration = 6000; // 6 seconds per slide
  const handleNext = () => {
    if (isAnimating)
      return;
    setIsAnimating(true);
    setCurrentIdx((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };
  const handlePrev = () => {
    if (isAnimating)
      return;
    setIsAnimating(true);
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };
  const goToSlide = (idx) => {
    if (isAnimating || idx === currentIdx)
      return;
    setIsAnimating(true);
    setCurrentIdx(idx);
    setTimeout(() => setIsAnimating(false), 600);
  };
  useEffect(() => {
    if (isPaused)
      return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, duration);
    return () => {
      if (timerRef.current)
        clearInterval(timerRef.current);
    };
  }, [currentIdx, isPaused, isAnimating]);
  if (!slides || slides.length === 0) {
    return null;
  }

  const activeSlide = slides[currentIdx] || slides[0];

  const handleCtaClick = () => {
    const destination = activeSlide.ctaLink || (activeSlide.categorySlug ? `/products/${activeSlide.categorySlug}` : '/products');
    
    if (destination.startsWith('/')) {
      navigate(destination);
      if (onSelectCategory && activeSlide.categorySlug) {
        onSelectCategory(activeSlide.categorySlug);
      }
    } else if (destination.startsWith('#')) {
      const target = document.querySelector(destination);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (onSelectCategory) onSelectCategory(destination);
      navigate(`/products/${destination}`);
    }
  };
  return (<section id="hero-banner-carousel" className="relative w-full h-[70vh] md:h-[82vh] lg:h-[88vh] overflow-hidden bg-[#1A1A1A] select-none" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} aria-label="Hero Carousel Banner">
    {/* Slides Background Images with Smooth Crossfade */}
    {slides.map((slide, idx) => {
      const isCurrent = idx === currentIdx;
      return (<div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`} style={{ transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 8s ease-out' }}>
        {/* Image with Lazy Loading Optimization */}
        <img
          src={slide.image}
          alt={slide.title || slide.heading || 'Storefront Editorial'}
          className="w-full h-full object-cover object-center"
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding={idx === 0 ? 'sync' : 'async'}
          fetchPriority={idx === 0 ? 'high' : 'low'}
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>);
    })}

    {/* Slide Content Overlay */}
    <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center text-white">
      <div className="max-w-2xl space-y-4 md:space-y-6">
        {/* Tag / Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xs text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C8A87C] animate-fade-in">
          <Sparkles className="w-3 h-3 text-[#C8A87C]" />
          <span>{activeSlide.tag}</span>
          {activeSlide.badgeText && (<>
            <span className="text-white/40">•</span>
            <span className="text-white tracking-widest">{activeSlide.badgeText}</span>
          </>)}
        </div>

        {/* Heading (Playfair Display Serif) */}
        <h1 id={`hero-slide-heading-${activeSlide.id}`} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-sm">
          {activeSlide.title || activeSlide.heading}
        </h1>

        {/* Subheading */}
        <p className="text-neutral-200 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl text-neutral-200/90 font-sans">
          {activeSlide.subtitle || activeSlide.subheading}
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
          <button id={`hero-cta-btn-${activeSlide.id}`} onClick={handleCtaClick} className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#C8A87C] hover:bg-[#B8956A] text-[#1A1A1A] text-xs md:text-sm font-semibold uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-xl rounded-xs group cursor-pointer">
            <span>{activeSlide.ctaText || activeSlide.cta || 'Explore Collection'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>

    {/* Navigation Arrow Buttons */}
    <div className="absolute inset-y-0 left-4 md:left-8 z-30 flex items-center">
      <button id="hero-carousel-prev-btn" onClick={handlePrev} className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/30 hover:bg-[#1A1A1A] text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none" aria-label="Previous Slide">
        <ChevronLeft className="w-6 h-6 -ml-0.5" />
      </button>
    </div>

    <div className="absolute inset-y-0 right-4 md:right-8 z-30 flex items-center">
      <button id="hero-carousel-next-btn" onClick={handleNext} className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/30 hover:bg-[#1A1A1A] text-white/80 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg hover:scale-105 focus:outline-none" aria-label="Next Slide">
        <ChevronRight className="w-6 h-6 -mr-0.5" />
      </button>
    </div>

    {/* Bottom Bar: Indicators & Counter */}
    <div className="absolute bottom-6 md:bottom-8 inset-x-0 z-30 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
      {/* Slide Counter (01 / 04) */}
      <div className="text-white/80 text-xs font-mono tracking-widest">
        <span className="text-[#C8A87C] font-bold text-sm">
          0{currentIdx + 1}
        </span>
        <span className="mx-1 text-white/40">/</span>
        <span className="text-white/60">0{slides.length}</span>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center gap-2.5">
        {slides.map((_, idx) => (<button key={idx} id={`hero-dot-${idx}`} onClick={() => goToSlide(idx)} className={`h-2 transition-all duration-300 rounded-full ${idx === currentIdx
          ? 'w-8 bg-[#C8A87C]'
          : 'w-2 bg-white/40 hover:bg-white/70'}`} aria-label={`Go to slide ${idx + 1}`} />))}
      </div>

      {/* Autoplay Status Indicator */}
      <div className="hidden sm:flex items-center gap-2 text-white/60 text-[11px] uppercase tracking-wider">
        <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
        <span>{isPaused ? 'Paused' : 'Auto-Playing'}</span>
      </div>
    </div>
  </section>);
};
