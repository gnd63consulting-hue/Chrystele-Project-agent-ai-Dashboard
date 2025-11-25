import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"
import { MainLayout } from "@/components/layout/main-layout"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "CARIBEquity Video Dashboard",
  description: "AI Video Production Dashboard for CARIBEquity",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
