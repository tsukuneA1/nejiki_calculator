import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>金ネジキダメージ計算機 - ポケモンプラチナ/HGSS対応</title>
        <meta
          name="description"
          content="ポケモンバトルファクトリー（金ネジキ）用のダメージ計算ツール。HGSS/プラチナ対応、技や特性、持ち物を設定して詳細なダメージをチェック！"
        />
        <meta property="og:title" content="金ネジキダメージ計算機" />
        <meta
          property="og:description"
          content="ポケモンバトルファクトリーのダメージ計算ができるツールです。"
        />
        <meta property="og:image" content="https://yourdomain.com/ogp.png" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
