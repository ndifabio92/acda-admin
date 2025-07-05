import { GameMode } from '../../types/api/modeGame';

export const gameModeTranslations: Record<GameMode, string> = {
  [GameMode.PUBLIC]: 'Público',
  [GameMode.PRIVATE]: 'Privado',
  [GameMode.MILSIM]: 'Milsim',
  [GameMode.EXTREME]: 'Extremo',
  [GameMode.COURSE]: 'Curso',
};
