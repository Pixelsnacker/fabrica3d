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
      {/* pt-14 = mobile (only main nav 56px), md:pt-[88px] = desktop (topbar 32px + main nav 56px) */}
      <main className={`flex-1 pt-14 md:pt-[88px] ${className}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
