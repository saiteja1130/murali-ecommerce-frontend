import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, ShieldCheck, Award, HeartHandshake, ArrowRight, ChevronRight, CheckCircle2, Star } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">About Us</span>
        </nav>

        {/* Hero Banner Section */}
        <div className="relative rounded-2xl overflow-hidden bg-[#1D241C] text-white min-h-[420px] flex items-center p-8 sm:p-16 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="Murari's Glam & Glow Craftsmanship"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C69E58] text-[#1D241C] text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg">
              <Sparkles className="w-3 h-3" />
              About Murari's Glam & Glow
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Fashion Crafted for Comfort & Elegance
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              We design stylish, high-quality clothing made from premium fabrics. Our goal is to bring you timeless styles that make you look confident and feel your absolute best.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C69E58] hover:bg-[#B38C47] text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#506040]">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D241C]">
              Quality You Can Feel
            </h2>
            <p className="text-xs sm:text-sm text-[#687163]">
              Every garment in our collection is made with careful attention to stitching, fabric quality, and real-life comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#506040]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">Premium Fabrics</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                We choose soft, breathable, and durable fabrics that stay vibrant and comfortable wash after wash.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#506040]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">Perfect Fit & Styling</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Our cuts and tailoring are designed to give you a flattering, relaxed fit that moves naturally with you.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#506040]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">Fair & Honest Pricing</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                No middleman markups. We deliver luxury quality and fine finishing at fair, accessible everyday prices.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#506040]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1D241C]">Customer First</h3>
              <p className="text-xs text-[#687163] leading-relaxed">
                Enjoy easy 7-day returns, fast doorstep shipping, and friendly support whenever you need help.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-14 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#506040] block">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1D241C] tracking-tight">
                “Great style starts with great quality, comfort, and attention to detail.”
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#687163] leading-relaxed">
                <p>
                  <strong>Murari's Glam & Glow</strong> was created to offer modern clothing that combines everyday elegance with long-lasting quality. We wanted to move away from fast fashion and focus on outfits you will love wearing again and again.
                </p>
                <p>
                  From everyday casuals to party and festive looks, every design is selected to bring out your natural glow. We believe looking stylish should feel effortless and comfortable every single day.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
                <div>
                  <div className="font-serif text-lg font-bold text-[#1D241C]">Murari's Glam & Glow Team</div>
                  <div className="text-xs text-[#506040] font-medium">Mumbai, India</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
                alt="Murari's Glam & Glow Fashion Studio"
                className="w-full h-[380px] object-cover rounded-2xl shadow-md border border-[#E8E4DC]"
              />
            </div>
          </div>
        </div>

        {/* Key Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#1D241C] text-white p-8 sm:p-12 rounded-2xl text-center shadow-lg">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C69E58]">100%</div>
            <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Quality Inspected</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C69E58]">50k+</div>
            <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Happy Customers</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C69E58]">7 Days</div>
            <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Easy Returns</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C69E58]">4.9 ★</div>
            <div className="text-xs text-neutral-300 mt-1 uppercase tracking-wider">Customer Rating</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D241C]">
            Find Your Next Favorite Outfit
          </h2>
          <p className="text-xs sm:text-sm text-[#687163] max-w-md mx-auto">
            Explore our wide range of dresses, tops, coordinates, and everyday essentials.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
