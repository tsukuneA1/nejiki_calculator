import { typeStrengthen } from '@/constants/items';
import { Attacker } from '@/types/attacker';

export const calculateMovePower = (attacker: Attacker) => {
  let movePower = attacker.move!.power!;
  movePower *= typeStrengthen({
    type: attacker.move!.type,
    item: attacker.item!,
  });

  if(attacker.ability == 'テクニシャン' && attacker.move!.power! <= 60){
    movePower *= 1.5;
  }

  return movePower;
};
