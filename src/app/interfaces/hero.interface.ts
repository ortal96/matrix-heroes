export enum AbilityOptions {
  Attacker = 'Attacker',
  Defender = 'Defender'
}

export interface IHero {
  id: string;
  name: string;
  ability: AbilityOptions,
  suitColor: string;
  startingPower: number;
  currentPower: number;
  startTrainingDate: Date;
  trainerId: string;
  trainings: Date[]
}
