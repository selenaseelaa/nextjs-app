import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css"; // Jika diperlukan untuk styling tambahan
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Catatan Hemodialisis",
  description: "Generated by create next app",
  image: "/logo.jpeg", // Pastikan path ini sesuai dengan lokasi gambar logo di public
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen `}>
        <Navbar />
        <div className="flex-grow bg-gray-100">
          <div className="mt-8">{children}</div>
        </div>
        <Footer /> {/* Add Footer component here */}
      </body>
    </html>
  );
}