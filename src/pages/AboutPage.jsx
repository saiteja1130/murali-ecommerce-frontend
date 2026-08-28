import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Leaf, ShieldCheck, Award, HeartHandshake, ArrowRight, ChevronRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-16 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B]">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1A1A1A] font-semibold">About SUMILUX</span>
        </nav>

        {/* Hero Banner Section */}
        <div className="relative rounded-[4px] overflow-hidden bg-neutral-900 text-white min-h-[420px] flex items-center p-8 sm:p-16">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
            alt="SUMILUX Atelier Craftsmanship"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C8A87C] text-[#1A1A1A] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs">
              <Sparkles className="w-3 h-3" />
              Est. 2026 • The Atelier Charter
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Quiet Luxury. Architectural Precision.
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              We design foundational wardrobe pieces created from certified organic fibers, 100% GOTS cottons, and Italian vegetable-tanned leathers — free of transient trends and engineered for lifetime wear.
            </p>
          </div>
        </div>

        {/* The 4 Foundational Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A87C]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Crafted Without Compromise
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B]">
              Every garment in the SUMILUX archive represents a dialogue between historical Italian atelier traditions and progressive sustainable engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C]">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">100% Traceable Fibers</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                We source exclusively GOTS-certified organic cotton, cruelty-free peace silk, and regenerative merino wool directly from family-run mills in Biella, Italy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Architectural Patterning</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Sculpted lapels, hand-basted shoulder canvas, and micro-tailored seam allowances ensure fluid motion and impeccable silhouette drape across all body profiles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Zero-Waste Atelier</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Every fabric remnant is repurposed into limited edition pocket squares, lining linings, or donated to artisanal textile apprenticeships across Europe.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[4px] border border-[#E8E3DE] shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E3DE] flex items-center justify-center text-[#C8A87C]">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Heirloom Guarantee</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed">
                Every piece is backed by our lifetime repair commitment. Bring your SUMILUX coat or blazer to any atelier for complimentary button re-stitching and lining preservation.
              </p>
            </div>
          </div>
        </div>

        {/* Founder Letter / Atelier Story */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-8 sm:p-14 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A87C] block">
                The Founder’s Note
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
                “True luxury is not defined by excess, but by the quiet certainty of perfection.”
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed">
                <p>
                  SUMILUX was born out of frustration with disposable luxury fashion. We observed a world inundated with fleeting logos and seasonal hype, where garments were designed to become obsolete within months.
                </p>
                <p>
                  Our atelier set out with a singular, uncompromising ambition: to craft garments of supreme architectural elegance that our patrons will proudly wear for decades. When you choose SUMILUX, you are investing in quiet confidence, ethical craftsmanship, and pure textural mastery.
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EFE9]">
                <div className="font-serif text-lg font-bold text-[#1A1A1A]">Eleonora Vance</div>
                <div className="text-xs text-[#A68758] font-medium">Founder & Creative Director • SUMILUX Atelier</div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop"
                alt="Eleonora Vance in Atelier"
                className="w-full h-[400px] object-cover rounded-[4px] shadow-md border border-[#E8E3DE]"
              />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded font-mono">
                Milan Studio • 2026
              </div>
            </div>
          </div>
        </div>

        {/* Atelier Key Figures */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#1A1A1A] text-white p-8 sm:p-12 rounded-[4px] text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C8A87C]">100%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Certified Organic Fibers</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C8A87C]">40+</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Hours Hand-Tailored per Coat</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C8A87C]">0%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Single-Use Plastics in Packing</div>
          </div>
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C8A87C]">14.8k+</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Satisfied Global Patrons</div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
            Experience the Atelier Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mx-auto">
            Discover over 114+ signature creations tailored from Italian linens, organic wools, and silk capsules.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors shadow-sm"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
