const strengthenItemsMap: Record<string, string[]> = {
  ノーマル: ["シルクのスカーフ"],
  みず: ["うしおのおこう", "さざなみのおこう", "しんぴのしずく"],
  くさ: ["おはなのおこう", "きせきのタネ"],
  ほのお: ["もくたん"],
  でんき: ["じしゃく"],
  こおり: ["とけないこおり"],
  かくとう: ["くろおび"],
  あく: ["くろいメガネ"],
  どく: ["どくバリ"],
  じめん: ["やわらかいすな"],
  ひこう: ["するどいくちばし"],
  エスパー: ["まがったスプーン", "あやしいおこう"],
  いわ: ["がんせきおこう", "かたいいし"],
  むし: ["ぎんのこな"],
  ゴースト: ["のろいのおふだ"],
  ドラゴン: ["りゅうのキバ"],
  はがね: ["メタルコート"],
};

export const typeStrengthen = ({
  type,
  item,
}: {
  type: string;
  item: string;
}) => {
  const strengthenItems = strengthenItemsMap[type];
  if (strengthenItems?.includes(item)) {
    return 1.2;
  }
  return 1;
};

const reduceByHalfItemsMap: Record<string, string[]> = {
  ノーマル: ["ホズのみ"],
  みず: ["イトケのみ"],
  くさ: ["リンドのみ"],
  ほのお: ["オッカのみ"],
  でんき: ["ソクノのみ"],
  こおり: ["ヤチェのみ"],
  かくとう: ["ヨプのみ"],
  あく: ["ナモのみ"],
  どく: ["ビアーのみ"],
  じめん: ["シュカのみ"],
  ひこう: ["バコウのみ"],
  エスパー: ["ウタンのみ"],
  いわ: ["ヨロギのみ"],
  むし: ["タンガのみ"],
  ゴースト: ["カシブのみ"],
  ドラゴン: ["ハバンのみ"],
  はがね: ["リリバのみ"],
};

export const typeReduceHalf = ({
  type,
  item,
}: {
  type: string;
  item: string;
}) => {
  const halfItems = reduceByHalfItemsMap[type];
  if (halfItems?.includes(item)) {
    return 0.5;
  }
  return 1;
};
