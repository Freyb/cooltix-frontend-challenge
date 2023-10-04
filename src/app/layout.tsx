import StyledComponentsRegistry from '@/lib/registry';
import { ApolloWrapper } from '@/utils/ApolloProvider';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import './globals.css';

const font = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ApolloWrapper>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
