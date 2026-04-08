import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sai Sidharthan | Terminal Portfolio',
  description:
    'Backend Developer & AI Engineer — explore my portfolio through an interactive terminal experience.',
  keywords: [
    'Sai Sidharthan',
    'Backend Developer',
    'AI Engineer',
    'Portfolio',
    'Python',
    'TypeScript',
    'Next.js',
  ],
  openGraph: {
    title: 'Sai Sidharthan | Terminal Portfolio',
    description:
      'Backend Developer & AI Engineer — type commands to explore my work.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
