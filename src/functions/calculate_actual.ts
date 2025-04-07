export const calculateActual = (
  baseStat: number,
  ev: number,
  iv: number,
  level: number,
  nature: number
) => {
  const actual = Math.floor(
    Math.floor(((baseStat * 2 + iv + ev / 4) * level) / 100 + 5) * nature
  );
  return actual;
};

export const calculateHActual = (
  baseStat: number,
  ev: number,
  iv: number,
  level: number
) => {
  const actual = Math.floor(
    Math.floor(((baseStat * 2 + iv + ev / 4) * level) / 100 + 10) + level
  );
  return actual;
};
