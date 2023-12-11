'use client';
import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Divider, Flex, Grid, GridCol, Title } from '@mantine/core';

import { useRouter } from 'next/navigation';

import type { SearchParams } from '@/types/common';
import type { CardLayout } from '@/types/challenges';

import { Container } from '@/components/common/Container';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { LayoutToggleSwitch } from '@/components/challenges/LayoutToggleSwitch';

// TO BE REMOVED
const CHALLENGE = {
  title: 'Take an interview',
  description:
    'Public projects are subject to greater accountability, especially if you shared your repository. Public projects are subject to greater accountability, especially if you shared your repository',
  coverImgSrc: '/cover.jpg',
  score: 10
};

// TO BE REMOVED
const CHALLENGES = [CHALLENGE, CHALLENGE, CHALLENGE, CHALLENGE, CHALLENGE] as const;

export default function Challenges({ searchParams }: Readonly<{ searchParams: SearchParams }>) {
  const layout = (searchParams.layout || 'list') as CardLayout;
  const gridSpan = layout === 'grid' ? 4 : 12;

  const router = useRouter();

  return (
    <Box component="section" p="xl">
      <Flex mb="28" justify="space-between">
        <Title>Challenges</Title>
        <Flex gap="xl">
          <LayoutToggleSwitch />
          <Button onClick={() => router.push('/challenges/add')} leftSection={<IconPlus size={14} />}>
            Challenge
          </Button>
        </Flex>
      </Flex>
      <Divider />

      <Container>
        <Grid gutter="xl" mt="xl">
          {CHALLENGES.map((challenge) => (
            <GridCol key={challenge.title} span={gridSpan}>
              <ChallengeCard challenge={challenge} cardLayout={layout} />
            </GridCol>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
