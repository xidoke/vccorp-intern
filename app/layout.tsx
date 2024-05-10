import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './ui/globals.css';
import React, { StrictMode } from 'react';

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
      <body className={`${inter.className} antialiased`}>
      <main className="h-full">{children}</main>
      </body>
      </html>
  );
}
