import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
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
        width: 512,
        height: 512,
        alt: "Fotty Motion",
      }
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fotty Motion",
    description: "Сервис по оживлению и обработке фотографий.",
    images: ["https://fottymotion.ru/icon.png"],
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
      <head>
        <Script
          id="yandex-metrika"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111640506', 'ym');

              ym(111640506, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
            `,
          }}
        />
      </head>
      <body>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/111640506" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        {children}
      </body>
    </html>
  );
}
