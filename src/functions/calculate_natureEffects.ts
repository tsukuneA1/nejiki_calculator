type Stat = "attack" | "defense" | "spAttack" | "spDefense" | "speed";

interface natureEffect {
  up: Stat | null;
  down: Stat | null;
}

const natureEffects: Record<string, natureEffect> = {
  さみしがり: { up: "attack", down: "defense" },
  いじっぱり: { up: "attack", down: "spAttack" },
  やんちゃ: { up: "attack", down: "spDefense" },
  ゆうかん: { up: "attack", down: "speed" },

  ずぶとい: { up: "defense", down: "attack" },
  わんぱく: { up: "defense", down: "spAttack" },
  のうてんき: { up: "defense", down: "spDefense" },
  のんき: { up: "defense", down: "speed" },

  ひかえめ: { up: "spAttack", down: "attack" },
  おっとり: { up: "spAttack", down: "defense" },
  うっかりや: { up: "spAttack", down: "spDefense" },
  れいせい: { up: "spAttack", down: "speed" },

  おだやか: { up: "spDefense", down: "attack" },
  おとなしい: { up: "spDefense", down: "defense" },
  しんちょう: { up: "spDefense", down: "spAttack" },
  なまいき: { up: "spDefense", down: "speed" },

  おくびょう: { up: "speed", down: "attack" },
  せっかち: { up: "speed", down: "defense" },
  ようき: { up: "speed", down: "spAttack" },
  むじゃき: { up: "speed", down: "spDefense" },

  がんばりや: { up: null, down: null },
  すなお: { up: null, down: null },
  てれや: { up: null, down: null },
  きまぐれ: { up: null, down: null },
  まじめ: { up: null, down: null },
};

export const calculateNatureEffects = (nature: string, stat: string) => {
  const effect = natureEffects[nature];

  if (effect.up === stat) {
    return 1.1;
  }
  if (effect.down === stat) {
    return 0.9;
  }
  return 1.0;
};
