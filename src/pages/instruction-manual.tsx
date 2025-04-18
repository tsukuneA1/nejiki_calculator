import { SubLayout } from '@/layouts/sub/sub-layout';

import ReactMarkdown from 'react-markdown';

export default function InstructionManual() {
  const content = `# 使用説明書
  ## はじめに
  このツールは、ポケモンのダメージ計算を行うためのものです。ポケモンの技や特性、持ち物などを設定し、ダメージを計算することができます。
  ## 使用方法
  1. ポケモンを選択します。
  2. 技を選択します。
  3. 特性を選択します。
  4. 持ち物を選択します。
  5. レベルを選択します。
  6. ダメージを計算します。
  ## 注意事項 `;
  
  return (
    <SubLayout>
      <div className='prose min-h-80 w-full max-w-none rounded-lg border-2 border-gray-300 p-10'>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 {...props} className="flex items-center pb-2" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="border-gray-300 border-b pb-1" />
          ),
          a: ({ node, ...props }) => (
            <a {...props} className="text-blue-500 hover:text-blue-700" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
      </div>
      
    </SubLayout>
  );
}
