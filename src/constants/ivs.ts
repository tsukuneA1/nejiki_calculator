export const ivItems = [0, 4, 8, 12, 16, 20, 24, 31];

export const timesItems = [
  '1周目',
  '2周目(7戦目)',
  '3周目(14戦目)',
  '銀ネジキ',
  '4周目',
  '5周目(28戦目)',
  '6周目(35戦目)',
  '7周目(42戦目)',
  '8周目以降(金ネジキ)',
];

export const findItems = (pos: number) => {
  if (pos <= 3) {
    return pos + 1;
  }
  return pos;
};
