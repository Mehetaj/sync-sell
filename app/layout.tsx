import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/navbar'

export const metadata: Metadata = {
  title: 'SynC',
  description: 'Death Metal fashion and lifestyle brand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}</body>
    </html>
  )
}

