import ThemeRegistry from './ThemeRegistry'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NFT Gated Server',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
    </html>
  )
}
