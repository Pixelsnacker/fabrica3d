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
      {/* pt-[82px] = mobile (only main nav 82px), md:pt-[130px] = desktop (topbar 48px + main nav 82px) */}
      <main className={`flex-1 pt-[82px] md:pt-[130px] ${className}`}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
