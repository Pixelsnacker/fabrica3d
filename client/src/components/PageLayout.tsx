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
      {/* pt-[68px] = mobile (only main nav 68px), md:pt-[108px] = desktop (topbar 40px + main nav 68px) */}
      <main className={`flex-1 pt-[68px] md:pt-[108px] ${className}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
