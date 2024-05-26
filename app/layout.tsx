import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './ui/globals.css';
import React from 'react';
import {Toaster} from '@/components/ui/toaster';
import {Analytics} from "@vercel/analytics/react"

const inter = Inter({subsets: ['latin']});
import {SpeedInsights} from "@vercel/speed-insights/next"
import {SessionProvider} from "next-auth/react";

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
        <SessionProvider>
            <html lang="en">
            <body suppressHydrationWarning={true} className={`${inter.className} antialiased`}>
            <main className="h-screen">{children}
                <Analytics/><SpeedInsights/></main>
            <Toaster/>
            </body>
            </html>
        </SessionProvider>
    );
};
