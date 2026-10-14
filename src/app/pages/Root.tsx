import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/mobile/MobileBottomNav';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans pb-16 md:pb-0">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}