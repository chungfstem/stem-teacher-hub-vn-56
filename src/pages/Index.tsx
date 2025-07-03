
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResourceGrid from '@/components/ResourceGrid';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner size="small" className="mb-6" />
        </div>
        <ResourceGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
