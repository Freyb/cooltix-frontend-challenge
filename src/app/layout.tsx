import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { ApolloWrapper } from '@/utils/ApolloProvider';
import { Footer } from '@/components/layout/Footer';

const font = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        <ApolloWrapper>{children}</ApolloWrapper>
        <Footer />
      </body>
    </html>
  );
}
