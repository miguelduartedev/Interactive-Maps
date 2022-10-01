import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/icons/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/icons/favicon-16x16.png"
        />
      </Head>
      <meta charSet="utf-8" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Sora"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
