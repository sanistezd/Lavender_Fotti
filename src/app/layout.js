import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "HighQuality | Прокатись на волне креатива",
  description: "Профессиональное редактирование и оживление фотографий.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
