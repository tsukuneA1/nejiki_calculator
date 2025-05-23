export type Pokemon = {
	id: number;
	name: string;
	type1: string;
	type2: string | null;
	hp: number;
	attack: number;
	defense: number;
	spAttack: number;
	spDefense: number;
	speed: number;
	weight: number;
	ability1: string;
	ability2: string | null;
	imageSrc: string;
};
