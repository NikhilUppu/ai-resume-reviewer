'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Created by</span>
          <Link
            href="https://pragusga.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            Taufik Pragusga
          </Link>
        </div>
      </div>
    </footer>
  );
}
