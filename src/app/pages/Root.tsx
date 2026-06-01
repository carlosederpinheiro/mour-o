import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Toaster } from 'sonner';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Toaster position="bottom-right" richColors />
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}