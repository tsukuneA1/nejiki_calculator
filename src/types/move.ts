export type Move = {
    id: number;
    name: string;
    type: string;
    power: number | null;
    accuracy: number | null;
    classification: string;
    pp: number | null;
    super: number;
  }