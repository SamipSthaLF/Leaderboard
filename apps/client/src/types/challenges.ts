export type ChallengeFormValues = {
  challengeScore: number;
  challengeTitle: string;
  description: string;
};

export type CardLayout = 'grid' | 'list';

export interface Challenge {
  id: number;
  title: string;
  score: number;
  description: string;
  coverImgSrc: string;
}
