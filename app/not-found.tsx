import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <span className="text-4xl font-bold text-muted-foreground">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s help you find food assistance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline" className="gap-2">
              <Search className="h-5 w-5" />
              Search Pantries
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
