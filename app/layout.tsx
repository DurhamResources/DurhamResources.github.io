import type { ReactNode } from 'react';

// Root layout - just passes children through
// Locale-specific layout is in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
