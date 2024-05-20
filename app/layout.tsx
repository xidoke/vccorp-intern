import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VCCorp',
  description: 'CRUD application for VCCorp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.className} antialiased` }>
        <main className="h-full">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
