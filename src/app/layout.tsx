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
  title: "Fotty Motion",
  description: "Сервис по оживлению и обработке фотографий.",
  openGraph: {
    title: "Fotty Motion",
    description: "Сервис по оживлению и обработке фотографий.",
    url: "https://fottymotion.ru",
    siteName: "Fotty Motion",
    images: [
      {
        url: "https://fottymotion.ru/icon.png",
        width: 1024,
        height: 1024,
      }
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
