import { typeStrengthen } from '@/constants/items';
import { Attacker } from '@/types/attacker';

export const calculateMovePower = (attacker: Attacker) => {
  let movePower = attacker.move!.power!;
  movePower *= typeStrengthen({
    type: attacker.move!.type,
    item: attacker.item!,
  });

  return movePower;
};
