'use client';

import { FileText } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-base sm:text-lg font-semibold">
            AI Resume Reviewer
          </span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
