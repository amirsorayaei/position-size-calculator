import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-16x16.png"
        sizes="16x16"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="emotion-insertion-point" content="" />
      <link rel="manifest" href="/manifest.json" />

      <meta
        http-equiv="Cache-Control"
        content="no-cache, no-store, must-revalidate"
      />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />

      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta name="robots" content="noarchive" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
