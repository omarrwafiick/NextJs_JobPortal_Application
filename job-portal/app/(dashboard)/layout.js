import { Inter } from 'next/font/google';
import "./globals.css";
import Footer from '../(components)/footer';
import Nav from '../(components)/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Portal',
  description: 'Match jobs and skills',
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex flex-col h-screen max-h-screen">
          <Nav />
          <div className="flex-grow overflow-y-auto bg-slate-800 text-white">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
