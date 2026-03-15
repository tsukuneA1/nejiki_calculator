import Head from "next/head";

export default function Offline() {
  return (
    <>
      <Head>
        <title>オフライン - ねじき式ダメージ計算機</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            オフラインモード
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            インターネット接続がありません
          </p>
          <div className="mb-8 text-6xl">📡</div>
          <p className="text-gray-500">
            接続が復帰したら、ページを再読み込みしてください
          </p>
        </div>
      </div>
    </>
  );
}
