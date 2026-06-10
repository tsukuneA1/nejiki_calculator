import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/layouts/main/main-layout";
import { BookOpen, Calculator, Search, Swords, Trophy } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

const faqItems = [
  {
    question: "金ネジキとは何ですか？",
    answer:
      "ポケモン プラチナ・ハートゴールド/ソウルシルバーのバトルファクトリーで49連勝目に登場するファクトリーヘッド・ネジキのことです。手持ちには個体値31の強力なポケモンが揃っており、レンタルポケモンで挑む仕様も相まって、ポケモンシリーズ屈指の高難度チャレンジとして知られています。",
  },
  {
    question: "銀ネジキと金ネジキの違いは何ですか？",
    answer:
      "銀ネジキは21連勝目（3周目の7戦目）、金ネジキは49連勝目（7周目の7戦目）に登場します。銀ネジキの手持ちは個体値12前後ですが、金ネジキの手持ちはすべて個体値31で、出現プールも広く強力です。",
  },
  {
    question: "バトルファクトリーの相手はどんどん強くなりますか？",
    answer:
      "はい。連勝数が7増える（1周する）ごとに相手の出現グループと個体値が1段階上がります。個体値は0から始まり、4, 8, 12, 16, 20, 24と上がっていき、8周目以降は31になります。",
  },
  {
    question: "レンタルポケモンも周回で強くなりますか？",
    answer:
      "はい。レンタルポケモンの候補も周回数に応じて強いグループ・高い個体値のものに置き換わります。さらに、対戦勝利や相手ポケモンとの交換を重ねると、レンタル候補に一段強いポケモンが混ざりやすくなる仕組みがあります。",
  },
  {
    question: "金ネジキ攻略にダメージ計算は必要ですか？",
    answer:
      "ほぼ必須です。バトルファクトリーは情報戦であり、「相手の技を耐えられるか」「自分の技で何発で倒せるか」を正確に把握できるかどうかが勝率に直結します。当サイトのダメージ計算機は周回ごとの個体値を自動で反映するので、ファクトリーの仕様を覚えていなくても正確な計算ができます。",
  },
];

export default function StrategyGuide() {
  return (
    <>
      <Head>
        <title>
          金ネジキとは？ バトルファクトリー攻略ガイド【プラチナ/HGSS】
        </title>
        <meta
          name="description"
          content="金ネジキ・銀ネジキとは？ポケモンバトルファクトリー（プラチナ/HGSS）の仕組みと攻略法を徹底解説。周回ごとの相手の強さ・個体値の変化、レンタルポケモンの選び方、49連勝への道のりをわかりやすく紹介します。"
        />
        <meta
          name="keywords"
          content="金ネジキ,銀ネジキ,ネジキ,とは,バトルファクトリー,攻略,ポケモン,プラチナ,HGSS,ハートゴールド,ソウルシルバー,49連勝,レンタルポケモン"
        />
        <meta
          property="og:title"
          content="金ネジキとは？ バトルファクトリー攻略ガイド"
        />
        <meta
          property="og:description"
          content="金ネジキ・バトルファクトリーの仕組みと攻略法を徹底解説。周回ごとの相手の強さ、レンタルポケモンの選び方、49連勝への道のりを紹介。"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://nejiki-calculator.com/images/nejiki_image.png"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta
          property="og:url"
          content="https://nejiki-calculator.com/strategy-guide"
        />
        <meta property="og:site_name" content="金ネジキ攻略ツール" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="金ネジキとは？ バトルファクトリー攻略ガイド"
        />
        <meta
          name="twitter:description"
          content="金ネジキ・バトルファクトリーの仕組みと攻略法を徹底解説。49連勝への道のりを紹介。"
        />
        <meta
          name="twitter:image"
          content="https://nejiki-calculator.com/images/nejiki_image.png"
        />
        <link
          rel="canonical"
          href="https://nejiki-calculator.com/strategy-guide"
        />
        <meta name="author" content="金ネジキ攻略ツール" />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      </Head>
      <MainLayout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "金ネジキとは？ バトルファクトリー攻略ガイド",
              description:
                "ポケモンバトルファクトリー（プラチナ/HGSS）の仕組みと金ネジキ攻略法の解説。",
              url: "https://nejiki-calculator.com/strategy-guide",
              inLanguage: "ja",
              author: {
                "@type": "Organization",
                name: "金ネジキ攻略ツール",
              },
              isPartOf: {
                "@type": "WebSite",
                name: "金ネジキ攻略ツール",
                url: "https://nejiki-calculator.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
        <article className="w-full max-w-4xl flex flex-col gap-6">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 shrink-0" />
              金ネジキとは？ バトルファクトリー攻略ガイド
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              「金ネジキ」とは、ポケットモンスター
              プラチナ・ハートゴールド/ソウルシルバーのバトルフロンティア施設「バトルファクトリー」で
              <strong>49連勝目に立ちはだかるファクトリーヘッド・ネジキ</strong>
              のこと。レンタルポケモンのみで戦う特殊ルールと相まって、ポケモンシリーズ屈指の高難度チャレンジとして知られています。このページでは、バトルファクトリーの仕組みと金ネジキ攻略のポイントを解説します。
            </p>
          </header>

          <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="bg-primary gap-0 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                金ネジキ・銀ネジキとは
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col gap-3 leading-relaxed">
              <p>
                バトルファクトリーでは7連勝するごとに1周とカウントされ、各周の7戦目には一段強い相手（ボス枠）が登場します。施設の主であるネジキは
                <strong>
                  21連勝目（3周目の7戦目）と49連勝目（7周目の7戦目）
                </strong>
                の2回登場し、それぞれ勝利すると銀・金の「しょうこのプリント」がもらえることから、前者が
                <strong>銀ネジキ</strong>、後者が<strong>金ネジキ</strong>
                と呼ばれています。
              </p>
              <p>
                銀ネジキの手持ちが個体値12前後なのに対し、金ネジキの手持ちは
                <strong>すべて個体値31</strong>
                。出現するポケモンのプールも広く、こちらはレンタルポケモンで挑むため、運と知識の両方が要求されます。その理不尽なまでの難しさから、ゲーム実況やRTA界隈では「金ネジキ」の名前が高難度チャレンジの代名詞として定着しました。
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="bg-primary gap-0 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <Swords className="h-5 w-5" />
                バトルファクトリーの基本ルール
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col gap-3 leading-relaxed">
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>
                  自分のポケモンは使えず、提示された6匹の
                  <strong>レンタルポケモン</strong>から3匹を選んで戦う。
                </li>
                <li>
                  対戦に勝利すると、相手が使っていたポケモン1匹と手持ち1匹を
                  <strong>交換</strong>できる。
                </li>
                <li>
                  ルールは「レベル50」と「オープンレベル（レベル100）」の2種類。金ネジキチャレンジは一般にオープンレベルで行われる。
                </li>
                <li>7連勝ごとに1周がクリアとなり、相手が一段階強くなる。</li>
                <li>1敗した時点で連勝記録は終了し、最初からやり直し。</li>
              </ul>
              <p>
                持ち物・特性・技構成がすべて固定されたポケモンの貸し借りで進むため、
                <strong>
                  「相手の手持ち候補を知っているか」「ダメージを正確に見積もれるか」
                </strong>
                という情報量がそのまま勝率になる、シリーズでも珍しい施設です。
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="bg-primary gap-0 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                周回ごとの相手の強さと個体値
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col gap-3 leading-relaxed">
              <p>
                相手のポケモンは周回数（連勝数）に応じて出現グループと個体値が決まります。各周の7戦目（ボス枠）だけは一段上の強さの相手が出てくる点に注意してください。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800">
                      <th className="border px-3 py-2 text-left">周回(連勝)</th>
                      <th className="border px-3 py-2 text-left">
                        通常戦(1〜6戦目)の個体値
                      </th>
                      <th className="border px-3 py-2 text-left">
                        7戦目(ボス枠)の個体値
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">1周目 (0〜6)</td>
                      <td className="border px-3 py-2">0</td>
                      <td className="border px-3 py-2">4</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">2周目 (7〜13)</td>
                      <td className="border px-3 py-2">0〜4</td>
                      <td className="border px-3 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">3周目 (14〜20)</td>
                      <td className="border px-3 py-2">4〜8</td>
                      <td className="border px-3 py-2">12（銀ネジキ）</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">4周目 (21〜27)</td>
                      <td className="border px-3 py-2">8〜12</td>
                      <td className="border px-3 py-2">16</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">5周目 (28〜34)</td>
                      <td className="border px-3 py-2">12〜16</td>
                      <td className="border px-3 py-2">20</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">6周目 (35〜41)</td>
                      <td className="border px-3 py-2">16〜20</td>
                      <td className="border px-3 py-2">24</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">7周目 (42〜48)</td>
                      <td className="border px-3 py-2">20〜24</td>
                      <td className="border px-3 py-2">31（金ネジキ）</td>
                    </tr>
                    <tr>
                      <td className="border px-3 py-2">8周目以降 (49〜)</td>
                      <td className="border px-3 py-2">24〜31</td>
                      <td className="border px-3 py-2">31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                レンタルポケモンの候補も周回が進むごとに強いグループ・高い個体値のものへ置き換わります。さらに、対戦勝利や相手ポケモンとの交換を重ねるほど、レンタル候補に一段強い個体が混ざりやすくなる内部ロジックが存在します。
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="bg-primary gap-0 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                金ネジキ攻略のポイント
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col gap-3 leading-relaxed">
              <ol className="list-decimal pl-5 flex flex-col gap-2">
                <li>
                  <strong>ダメージ計算で確定数を把握する</strong> —
                  「この技で相手を何発で倒せるか」「相手の攻撃を耐えられるか」を正確に知ることが最重要。感覚に頼ると、急所や乱数以前の択ミスで連勝が途切れます。
                </li>
                <li>
                  <strong>相手の手持ち候補を絞り込む</strong> —
                  ファクトリーのポケモンは技・持ち物・性格が固定。1匹目が見えた時点で残りの候補や危険な技を推測できます。
                </li>
                <li>
                  <strong>交換でパーティを強化し続ける</strong> —
                  勝利後の交換は単なるご褒美ではなく、周回が進んで相手が強くなるのに合わせて自分も強化していくための生命線です。
                </li>
                <li>
                  <strong>タイプ相性の補完を重視して3匹選ぶ</strong> —
                  レンタル6匹から選ぶ際は、単体性能だけでなく弱点の重なりを避けることが安定につながります。
                </li>
              </ol>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <Calculator className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold">ダメージ計算機</div>
                    <div className="text-sm text-slate-500">
                      周回ごとの個体値を自動反映して正確に計算
                    </div>
                  </div>
                </Link>
                <Link
                  href="/poke-search"
                  className="flex items-center gap-3 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <Search className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold">ポケモン検索</div>
                    <div className="text-sm text-slate-500">
                      出現ポケモンを持ち物・特性・能力値で絞り込み
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm py-0 overflow-hidden">
            <CardHeader className="bg-primary gap-0 text-white py-4">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                よくある質問
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="font-semibold mb-1">Q. {item.question}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    A. {item.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </article>
      </MainLayout>
    </>
  );
}
