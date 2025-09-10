import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Editado Studio - Editorial Studio crafting meaning, beauty, and long-lasting narratives',
  description: 'An editorial studio crafting meaning, beauty, and long-lasting narratives. Platform Strategy, Tech Integration, Editorial Design, Creative Direction.',
  keywords: ['editorial studio', 'design', 'creative direction', 'platform strategy', 'tech integration'],
  authors: [{ name: 'Editado Studio' }],
  creator: 'Editado Studio',
  openGraph: {
    title: 'Editado Studio - Editorial Studio',
    description: 'An editorial studio crafting meaning, beauty, and long-lasting narratives.',
    url: 'https://editado-studio.vercel.app',
    siteName: 'Editado Studio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editado Studio - Editorial Studio',
    description: 'An editorial studio crafting meaning, beauty, and long-lasting narratives.',
    creator: '@editadostudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f5f4f2" />
        <meta name="msapplication-TileColor" content="#f5f4f2" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/OpeningHoursSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}