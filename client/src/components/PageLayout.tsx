import Navigation from './Navigation';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={`flex-1 pt-16 md:pt-18 ${className}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
