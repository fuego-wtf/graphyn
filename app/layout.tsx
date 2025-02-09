import './globals.css'
import { fontSans } from '@/lib/fonts'
import ClientProviders from './client-providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'graphyn',
  description: 'graphyn - your ai agent platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={fontSans.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}



