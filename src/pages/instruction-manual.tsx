import { MainLayout } from "@/layouts/main/main-layout";
import Head from "next/head";

export default function InstructionManual() {
	return (
		<>
			<Head>
				<title>金ネジキ攻略ガイド | ポケモンバトルファクトリー 使い方マニュアル</title>
				<meta
					name="description"
					content="金ネジキ攻略ガイド。ポケモンバトルファクトリーダメージ計算機の詳しい使い方を解説。攻撃側・防御側の設定、環境設定、控えポケモン機能などを図解付きで説明。初心者から上級者まで完全サポート。"
				/>
				<meta name="keywords" content="金ネジキ,攻略ガイド,使い方,マニュアル,ポケモン,バトルファクトリー,ダメージ計算,プラチナ,HGSS,解説" />
				<meta property="og:title" content="金ネジキ攻略ガイド | ポケモンバトルファクトリー 使い方マニュアル" />
				<meta
					property="og:description"
					content="金ネジキ攻略に必須のダメージ計算機の使い方を詳しく解説。初心者から上級者まで完全サポート。"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:image"
					content="https://nejiki-calculator.com/images/nejiki_image.png"
				/>
				<meta
					property="og:url"
					content="https://nejiki-calculator.com/instruction-manual"
				/>
				<meta property="og:site_name" content="金ネジキ攻略ツール" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="金ネジキ攻略ガイド | 使い方マニュアル" />
				<meta name="twitter:description" content="金ネジキ攻略に必須のダメージ計算機の使い方を詳しく解説。" />
				<meta name="twitter:image" content="https://nejiki-calculator.com/images/nejiki_image.png" />
				<link
					rel="canonical"
					href="https://nejiki-calculator.com/instruction-manual"
				/>
				<meta name="author" content="金ネジキ攻略ツール" />
				<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
			</Head>
			<MainLayout>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "HowTo",
							name: "金ネジキ攻略 ダメージ計算機の使い方",
							description: "ポケモンバトルファクトリーダメージ計算機の詳しい使い方ガイド",
							url: "https://nejiki-calculator.com/instruction-manual",
							estimatedCost: {
								"@type": "MonetaryAmount",
								currency: "JPY",
								value: "0"
							},
							totalTime: "PT15M",
							supply: [
								"ポケモンプラチナまたはHGSS",
								"インターネット接続"
							],
							tool: [
								"ウェブブラウザ",
								"スマートフォンまたはPC"
							],
							keywords: "金ネジキ,ポケモン,バトルファクトリー,ダメージ計算"
						}),
					}}
				/>
			<div className="prose min-h-80 w-full rounded-lg border-2 border-gray-300 p-8 max-w-4xl bg-white mx-auto">
				<h1 className="flex items-center pb-4 text-4xl font-bold text-gray-800 border-b-2 border-gray-300">
					🧮 ポケモンバトルファクトリー ダメージ計算機
				</h1>
				
				<div className="text-lg text-gray-600 mb-8">
					このツールは、ポケモンプラチナ/ハートゴールド・ソウルシルバーのバトルファクトリー専用のダメージ計算機です。
					ファクトリーで使用可能なポケモンのデータに基づいて、正確なダメージ計算を行うことができます。
				</div>

				<nav className="bg-blue-50 p-6 rounded-lg mb-8">
					<h2 className="text-xl font-bold text-blue-800 mb-4">📋 目次</h2>
					<ul className="space-y-2 text-blue-700">
						<li><a href="#basic-setup" className="hover:text-blue-900 transition-colors">基本設定</a></li>
						<li><a href="#attacker-setup" className="hover:text-blue-900 transition-colors">攻撃側の設定</a></li>
						<li><a href="#defender-setup" className="hover:text-blue-900 transition-colors">防御側の設定</a></li>
						<li><a href="#env-setup" className="hover:text-blue-900 transition-colors">環境設定</a></li>
						<li><a href="#reserve-pokemon" className="hover:text-blue-900 transition-colors">控えポケモン機能</a></li>
						<li><a href="#multiple-attackers" className="hover:text-blue-900 transition-colors">複数攻撃者の追加</a></li>
						<li><a href="#pokemon-search" className="hover:text-blue-900 transition-colors">ポケモン検索機能</a></li>
						<li><a href="#tips" className="hover:text-blue-900 transition-colors">便利な機能</a></li>
					</ul>
				</nav>

				<section id="basic-setup" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						⚙️ 基本設定
					</h2>
					<div className="bg-yellow-50 p-6 rounded-lg mb-6">
						<h3 className="text-lg font-semibold text-yellow-800 mb-3">最初に設定すべき項目</h3>
						<ol className="list-decimal list-inside space-y-3 text-gray-700">
							<li><strong>レベル設定</strong>：50レベルまたはオープンレベルを選択</li>
							<li><strong>周回回数</strong>：現在の挑戦回数を選択（使用可能ポケモンが自動でフィルタリングされます）</li>
						</ol>
					</div>
					<div className="bg-blue-50 p-4 rounded-lg">
						<p className="text-blue-800 text-sm">
							💡 <strong>ヒント</strong>：周回回数を設定すると、その回数で使用できるポケモンのみが表示され、個体値も自動的に適切な値に設定されます。
						</p>
					</div>
				</section>

				<section id="attacker-setup" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						⚔️ 攻撃側の設定
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="bg-red-50 p-6 rounded-lg">
							<h3 className="text-lg font-semibold text-red-800 mb-4">必須設定項目</h3>
							<ul className="space-y-2 text-gray-700">
								<li>✅ <strong>ポケモン選択</strong>：オートコンプリート機能で検索</li>
								<li>✅ <strong>使用技</strong>：ダメージ計算の基準となる技</li>
							</ul>
						</div>
						<div className="bg-gray-50 p-6 rounded-lg">
							<h3 className="text-lg font-semibold text-gray-800 mb-4">調整可能項目</h3>
							<ul className="space-y-2 text-gray-700">
								<li>⚡ <strong>特性</strong>：ダメージに影響する特性を選択</li>
								<li>🎒 <strong>持ち物</strong>：攻撃力を上げるアイテムなど</li>
								<li>📈 <strong>ランク補正</strong>：攻撃・特攻のランク変化</li>
								<li>💥 <strong>急所</strong>：急所に当たった場合の計算</li>
								<li>🔥 <strong>やけど</strong>：物理技の威力半減</li>
							</ul>
						</div>
					</div>
					<div className="mt-6 p-4 bg-green-50 rounded-lg">
						<p className="text-green-800 text-sm">
							🎯 <strong>操作のコツ</strong>：ポケモン名を入力すると候補が表示されます。部分一致でも検索できるので、「ガブ」と入力すれば「ガブリアス」が見つかります。
						</p>
					</div>
				</section>

				<section id="defender-setup" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						🛡️ 防御側の設定
					</h2>
					<div className="bg-blue-50 p-6 rounded-lg">
						<h3 className="text-lg font-semibold text-blue-800 mb-4">設定項目</h3>
						<div className="grid md:grid-cols-2 gap-4">
							<ul className="space-y-2 text-gray-700">
								<li>🎯 <strong>ポケモン選択</strong></li>
								<li>⚡ <strong>特性選択</strong></li>
								<li>🎒 <strong>持ち物選択</strong></li>
							</ul>
							<ul className="space-y-2 text-gray-700">
								<li>🛡️ <strong>防御ランク</strong>：-6〜+6で設定</li>
								<li>✨ <strong>特防ランク</strong>：-6〜+6で設定</li>
							</ul>
						</div>
					</div>
					<div className="mt-4 p-4 bg-purple-50 rounded-lg">
						<p className="text-purple-800 text-sm">
							🔄 <strong>便利機能</strong>：画面中央の「⇄」ボタンで攻撃側と防御側のポケモンを瞬時に入れ替えできます。
						</p>
					</div>
				</section>

				<section id="env-setup" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						🌤️ 環境設定
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-yellow-50 p-4 rounded-lg">
							<h3 className="font-semibold text-yellow-800 mb-3">天候</h3>
							<ul className="text-sm space-y-1 text-gray-700">
								<li>☀️ にほんばれ</li>
								<li>🌧️ あめ</li>
								<li>🌪️ すなあらし</li>
								<li>❄️ あられ</li>
							</ul>
						</div>
						<div className="bg-cyan-50 p-4 rounded-lg">
							<h3 className="font-semibold text-cyan-800 mb-3">壁技</h3>
							<ul className="text-sm space-y-1 text-gray-700">
								<li>⚡ リフレクター</li>
								<li>✨ ひかりのかべ</li>
							</ul>
						</div>
						<div className="bg-red-50 p-4 rounded-lg">
							<h3 className="font-semibold text-red-800 mb-3">定数ダメージ</h3>
							<ul className="text-sm space-y-1 text-gray-700">
								<li>💎 ステルスロック</li>
								<li>💍 いのちのたま</li>
							</ul>
						</div>
					</div>
				</section>

				<section id="reserve-pokemon" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						📦 控えポケモン機能
					</h2>
					<div className="bg-green-50 p-6 rounded-lg mb-6">
						<h3 className="text-lg font-semibold text-green-800 mb-4">使い方</h3>
						<ol className="list-decimal list-inside space-y-3 text-gray-700">
							<li>攻撃側または防御側カードの下にある「📦 +」ボタンをクリック</li>
							<li>保存したいポケモンの情報を設定</li>
							<li>設定完了後、控えボックス内のポケモンをクリックして選択状態に</li>
							<li>選択状態で再度クリックすると、現在のポケモンと入れ替わり</li>
							<li>不要になったら「🗑️」ボタンで削除</li>
						</ol>
					</div>
					<div className="bg-orange-50 p-4 rounded-lg">
						<p className="text-orange-800 text-sm">
							⚠️ <strong>制限</strong>：攻撃側・防御側それぞれ最大6匹まで控えポケモンを保存できます。
						</p>
					</div>
				</section>

				<section id="multiple-attackers" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						👥 複数攻撃者の追加
					</h2>
					<div className="bg-purple-50 p-6 rounded-lg">
						<h3 className="text-lg font-semibold text-purple-800 mb-4">複数のポケモンで同時攻撃を計算</h3>
						<ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
							<li>攻撃側カードの「追加」ボタンをクリック</li>
							<li>新しいカードが下に追加される</li>
							<li>それぞれのカードで異なるポケモンと技を設定</li>
							<li>カードを折りたたむ場合は「^」ボタンをクリック</li>
							<li>不要なカードは「🗑️」ボタンで削除</li>
						</ol>
						<div className="bg-white p-4 rounded border-l-4 border-purple-400">
							<p className="text-purple-800 text-sm">
								💪 <strong>活用例</strong>：味方複数でのコンボ攻撃や、異なる技での与ダメージ比較に使用できます。
							</p>
						</div>
					</div>
				</section>

				<section id="pokemon-search" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						🔍 ポケモン検索機能
					</h2>
					<div className="bg-indigo-50 p-6 rounded-lg">
						<h3 className="text-lg font-semibold text-indigo-800 mb-4">詳細検索でポケモンを探す</h3>
						<p className="text-gray-700 mb-4">メニューの「ポケモン検索」ページで、条件を絞り込んでポケモンを探せます。</p>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h4 className="font-semibold text-indigo-700 mb-2">検索条件</h4>
								<ul className="space-y-1 text-sm text-gray-700">
									<li>🏷️ ポケモン名</li>
									<li>🔄 周回数</li>
									<li>⚡ 特性</li>
									<li>🎒 持ち物</li>
									<li>📊 レベル</li>
								</ul>
							</div>
							<div>
								<h4 className="font-semibold text-indigo-700 mb-2">ソート機能</h4>
								<ul className="space-y-1 text-sm text-gray-700">
									<li>❤️ HP順</li>
									<li>⚔️ 攻撃順</li>
									<li>🛡️ 防御順</li>
									<li>✨ 特攻・特防順</li>
									<li>💨 素早さ順</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section id="tips" className="mb-12">
					<h2 className="border-gray-300 border-b-2 pb-2 text-2xl font-bold text-gray-800 mb-6">
						💡 便利な機能・コツ
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div className="bg-blue-50 p-4 rounded-lg">
								<h3 className="font-semibold text-blue-800 mb-2">リアルタイム計算</h3>
								<p className="text-sm text-gray-700">設定を変更すると即座にダメージが再計算され、画面下部に結果が表示されます。</p>
							</div>
							<div className="bg-green-50 p-4 rounded-lg">
								<h3 className="font-semibold text-green-800 mb-2">自動設定</h3>
								<p className="text-sm text-gray-700">周回回数を設定すると、個体値が自動的に適切な値に調整されます。</p>
							</div>
							<div className="bg-yellow-50 p-4 rounded-lg">
								<h3 className="font-semibold text-yellow-800 mb-2">技詳細表示</h3>
								<p className="text-sm text-gray-700">技名にカーソルを合わせると、威力・命中率・効果などの詳細情報が表示されます。</p>
							</div>
						</div>
						<div className="space-y-4">
							<div className="bg-purple-50 p-4 rounded-lg">
								<h3 className="font-semibold text-purple-800 mb-2">ダメージ表示</h3>
								<p className="text-sm text-gray-700">最小〜最大ダメージとHP割合（%）で表示。乱数による幅も確認できます。</p>
							</div>
							<div className="bg-red-50 p-4 rounded-lg">
								<h3 className="font-semibold text-red-800 mb-2">タイプ相性</h3>
								<p className="text-sm text-gray-700">タイプ相性は自動計算。「効果はばつぐんだ！」や「効果はいまひとつ」も表示されます。</p>
							</div>
							<div className="bg-cyan-50 p-4 rounded-lg">
								<h3 className="font-semibold text-cyan-800 mb-2">プログレスバー</h3>
								<p className="text-sm text-gray-700">ダメージ量がビジュアルで分かりやすく表示されます。</p>
							</div>
						</div>
					</div>
				</section>

				<footer className="mt-12 pt-8 border-t-2 border-gray-200">
					<div className="bg-gray-50 p-6 rounded-lg text-center">
						<h3 className="text-lg font-semibold text-gray-800 mb-2">🏆 バトルファクトリー攻略に役立てよう！</h3>
						<p className="text-gray-600">
							このダメージ計算機を使って、効率的な戦略を立ててバトルファクトリー制覇を目指しましょう。
							正確なダメージ計算で、より確実な勝利への道筋が見えてきます。
						</p>
					</div>
				</footer>
			</div>
			</MainLayout>
		</>
	);
}