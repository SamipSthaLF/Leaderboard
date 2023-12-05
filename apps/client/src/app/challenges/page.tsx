import { Box, Stack, Title } from '@mantine/core';

import { ChallengeCard } from '@/components/ChallengeCard';

const CHALLENGES = [
  {
    title: 'Take an interview',
    description:
      'Public projects are subject to greater accountability, especially if you shared your repository. Public projects are subject to greater accountability, especially if you shared your repository',
    coverImgSrc: '/cover.jpg',
    score: 10
  },
  {
    title: 'Take an interview',
    description:
      'Public projects are subject to greater accountability, especially if you shared your repository. Public projects are subject to greater accountability, especially if you shared your repository',
    coverImgSrc: '/cover.jpg',
    score: 10
  }
] as const;

export default function Challenges() {
  return (
    <Box component="section">
      <Title>Challenges</Title>

      <Stack gap="24">
        {CHALLENGES.map((challenge) => (
          <ChallengeCard key={challenge.title} challenge={challenge} />
        ))}
      </Stack>
    </Box>
  );
}
