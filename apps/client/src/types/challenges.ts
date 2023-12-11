export type ChallengeFormValues = {
  challengeScore: number;
  challengeTitle: string;
  description: string;
};

export type CardLayout = 'grid' | 'list';

export interface Challenge {
  title: string;
  score: number;
  description: string;
  coverImgSrc: string;
}
