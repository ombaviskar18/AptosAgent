import { Inter } from "next/font/google";
import { Press_Start_2P } from 'next/font/google';
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Header from "./dashboard/_components/Header";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Aptos MiniHub",
  description: "Generate or edit minigames using Aptos Agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pressStart2P.className}>
      <body className={inter.className}>
        <Header/>
        {children}
        <Footer/> 
      </body>
    </html>
  );
}
