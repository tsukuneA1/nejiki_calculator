export const TypeItems: TypeItem[] = [
  {
    type: 'ノーマル',
    color: 'bg-gray-400',
    icon: 'images/typeIcon/ノーマル.png',
  },
  { type: 'ほのお', color: 'bg-red-400', icon: 'images/typeIcon/ほのお.png' },
  { type: 'みず', color: 'bg-blue-400', icon: 'images/typeIcon/みず.png' },
  {
    type: 'でんき',
    color: 'bg-yellow-400',
    icon: 'images/typeIcon/でんき.png',
  },
  { type: 'くさ', color: 'bg-green-400', icon: 'images/typeIcon/くさ.png' },
  {
    type: 'かくとう',
    color: 'bg-orange-400',
    icon: 'images/typeIcon/かくとう.png',
  },
  {
    type: 'エスパー',
    color: 'bg-purple-400',
    icon: 'images/typeIcon/エスパー.png',
  },
  { type: 'むし', color: 'bg-lime-400', icon: 'images/typeIcon/むし.png' },
  { type: 'いわ', color: 'bg-orange-400', icon: 'images/typeIcon/いわ.png' },
  {
    type: 'ゴースト',
    color: 'bg-indigo-400',
    icon: 'images/typeIcon/ゴースト.png',
  },
  {
    type: 'ドラゴン',
    color: 'bg-indigo-600',
    icon: 'images/typeIcon/ドラゴン.png',
  },
  { type: 'あく', color: 'bg-slate-700', icon: 'images/typeIcon/あく.png' },
  {
    type: 'フェアリー',
    color: 'bg-pink-400',
    icon: 'images/typeIcon/フェアリー.png',
  },
  { type: 'はがね', color: 'bg-slate-400', icon: 'images/typeIcon/はがね.png' },
  {
    type: 'じめん',
    color: 'bg-yellow-800',
    icon: 'images/typeIcon/じめん.png',
  },
  { type: 'ひこう', color: 'bg-blue-400', icon: 'images/typeIcon/ひこう.png' },
  { type: 'こおり', color: 'bg-cyan-400', icon: 'images/typeIcon/こおり.png' },
  { type: 'どく', color: 'bg-purple-400', icon: 'images/typeIcon/どく.png' },
];

type TypeItem = {
  type: string;
  color: string;
  icon: string;
};
