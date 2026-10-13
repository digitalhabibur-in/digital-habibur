import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar"; 
import Link from "next/link";
import ScrollObserver from "./components/ScrollObserver"; // 🌟 স্ক্রল অ্যানিমেশন ইম্পোর্ট

export const metadata: Metadata = {
  title: "Habibur Rahaman | Custom Web & Software Developer",
  description: "Professional Portfolio of Habibur Rahaman",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome for Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body suppressHydrationWarning={true}>
        
        {/* 🌟 পুরো সাইটে স্ক্রল অ্যানিমেশন চালু করার ইঞ্জিন */}
        <ScrollObserver />
        
        {/* 🌟 Fixed/Sticky Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        {children}

        {/* 🌟 Global Footer with Policy Links */}
        <footer style={{ textAlign: 'center', padding: '40px 0 30px', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <Link href="/privacy-policy" style={{ color: '#8b949e', fontSize: '0.9rem', fontWeight: 500 }} className="hover-green">Privacy Policy</Link>
              <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
              <Link href="/terms-conditions" style={{ color: '#8b949e', fontSize: '0.9rem', fontWeight: 500 }} className="hover-green">Terms & Conditions</Link>
            </div>
            
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>&copy; 2026 Habibur Rahaman.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
