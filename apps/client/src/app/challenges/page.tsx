import { IconPlus } from '@tabler/icons-react';
import { Box, Button, Divider, Flex, Grid, GridCol, Title } from '@mantine/core';

import type { SearchParams } from '@/types/common';
import type { CardLayout } from '@/types/challenges';

import { Container } from '@/components/common/Container';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { LayoutToggleSwitch } from '@/components/challenges/LayoutToggleSwitch';

const CHALLENGE = {
  title: 'Take an interview',
  description:
    'Public projects are subject to greater accountability, especially if you shared your repository. Public projects are subject to greater accountability, especially if you shared your repository',
  coverImgSrc: '/cover.jpg',
  score: 10
};

const CHALLENGES = [CHALLENGE, CHALLENGE, CHALLENGE, CHALLENGE, CHALLENGE] as const;

export default function Challenges({ searchParams }: Readonly<{ searchParams: SearchParams }>) {
  const layout = (searchParams.layout || 'list') as CardLayout;
  const gridSpan = layout === 'grid' ? 4 : 12;

  return (
    <Box component="section" p="24">
      <Flex mb="28" justify="space-between">
        <Title>Challenges</Title>
        <Flex gap="24">
          <LayoutToggleSwitch />
          <Button leftSection={<IconPlus size={14} />}>Challenge</Button>
        </Flex>
      </Flex>
      <Divider />

      <Container>
        <Grid gutter="24" mt="24">
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
