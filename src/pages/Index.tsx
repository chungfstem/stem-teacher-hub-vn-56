
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ResourceGrid from '@/components/ResourceGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ResourceGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
