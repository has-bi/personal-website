
import {Inter } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const inter = Inter({subsets: ['latin']
})


export const metadata = {
  title: "Hasbi - Personal Website",
  description: "Personal website and blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Header />
        <main className='min-h-screen'>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
