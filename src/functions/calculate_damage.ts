import type { Attacker } from "@/types/attacker";
import type { Defender } from "@/types/defender";
import type { Env } from "@/types/env";
import { calculateAtActual } from "./calculate_atActual";
import { calculateCompatibility } from "./calculate_compatibility";
import { calculateDfActual } from "./calculate_dfActual";
import { calculateMA } from "./calculate_ma";
import { calculateMB } from "./calculate_mb";
import { calculateMC } from "./calculate_mc";
import { calculateMovePower } from "./calculate_movePower";

export const calculateDamage = (
	attacker: Attacker,
	defender: Defender,
	settings: {
		level: number;
		times: number;
	},
	env: Env,
) => {
	if (
		attacker.factoryPokemon == null ||
		attacker.move == null ||
		defender.factoryPokemon == null
	) {
		return 0;
	}

	if (
		attacker.move?.power == null ||
		attacker.move?.power === 0 ||
		attacker.move?.type == null
	) {
		return 0;
	}

	const atPoke = attacker.factoryPokemon!;
	const dfPoke = defender.factoryPokemon!;

	const typePower =
		attacker.move?.type === atPoke.pokemon.type1 ||
		attacker.move?.type === atPoke.pokemon.type2
			? 1.5
			: 1;
	const compatibility = dfPoke.pokemon.type2
		? calculateCompatibility(attacker.move?.type, dfPoke.pokemon.type1) *
			calculateCompatibility(attacker.move?.type, dfPoke.pokemon.type2!)
		: calculateCompatibility(attacker.move?.type, dfPoke.pokemon.type1);

	const ma = calculateMA(attacker, defender, env);
	const mb = calculateMB(attacker, defender);
	const mc = calculateMC(attacker, defender, compatibility);
	const finalMovePower = calculateMovePower(attacker);

	const attack = calculateAtActual(attacker, settings);
	const defense = calculateDfActual(attacker, defender, settings);

	const damage =
		Math.floor(
			(Math.floor(
				(Math.floor((settings.level * 2) / 5 + 2) * finalMovePower * attack) /
					defense,
			) /
				50) *
				ma +
				2,
		) *
		mb *
		typePower *
		compatibility *
		mc;

	return Math.floor(damage);
};
