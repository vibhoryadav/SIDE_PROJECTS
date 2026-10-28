import React from 'react';
import { Hero } from '../components/Hero';
import { StorySection } from '../components/StorySection';
import { ProductGrid } from '../components/ProductGrid';
import { CinematicScroll } from '../components/CinematicScroll';
import { FeatureHighlights } from '../components/FeatureHighlights';
import { ProductComparison } from '../components/ProductComparison';
import { BrandPhilosophy } from '../components/BrandPhilosophy';
import { Testimonials } from '../components/Testimonials';
import { Newsletter } from '../components/Newsletter';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';

interface HomePageProps {
  categoryFilter?: ProductCategory;
  onSelectProduct: (productId: string) => void;
  onExploreSound: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categoryFilter = 'all',
  onSelectProduct,
  onExploreSound
}) => {
  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* 1. Cinematic Hero Section */}
      <Hero
        onShopClick={scrollToCollection}
        onExploreSound={onExploreSound}
        onProductSelect={onSelectProduct}
      />

      {/* 2. Product Storytelling Section */}
      <StorySection
        onExploreClick={scrollToCollection}
      />

      {/* 3. Featured Product Collection Grid */}
      <ProductGrid
        products={PRODUCTS}
        initialCategory={categoryFilter}
        onSelectProduct={onSelectProduct}
      />

      {/* 4. Signature Cinematic Scroll Section */}
      <CinematicScroll />

      {/* 5. Minimalist Feature Highlights */}
      <FeatureHighlights />

      {/* 6. Product Comparison Section */}
      <ProductComparison
        products={PRODUCTS}
        onSelectProduct={onSelectProduct}
      />

      {/* 7. Brand Philosophy Section */}
      <BrandPhilosophy />

      {/* 8. Testimonials and Social Proof */}
      <Testimonials />

      {/* 9. Newsletter Section */}
      <Newsletter />
    </main>
  );
};
