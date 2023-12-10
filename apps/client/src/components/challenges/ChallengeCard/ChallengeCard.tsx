import NextImage from 'next/image';
import { Box, Button, Divider, Flex, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';

import type { CardLayout } from '@/types/challenges';

import { getStylesByCardLayout } from '@/utils/challenges';

interface Challenge {
  title: string;
  score: number;
  description: string;
  coverImgSrc: string;
}

interface Props {
  challenge: Challenge;
  cardLayout: CardLayout;
}

export function ChallengeCard({ cardLayout, challenge }: Readonly<Props>) {
  const { containerFlexDirection, coverImageHeight, titleFontSize, imageWrapperStyles, contentWrapperStyles } =
    getStylesByCardLayout(cardLayout);

  return (
    <Paper component="article" p="24px" radius="md" shadow="card" maw="850px" mx="auto" withBorder>
      <Flex direction={containerFlexDirection} gap="lg">
        <Box component="figure" h={coverImageHeight} w="287" pos="relative" style={imageWrapperStyles}>
          <Image src={challenge.coverImgSrc} alt={challenge.title} radius="md" component={NextImage} fill />
        </Box>

        <Flex direction="column" justify="space-between" style={contentWrapperStyles}>
          <Stack gap="lg">
            <Title order={2} c="cascade-blue.9" fz={titleFontSize}>
              {challenge.title}
            </Title>
            <Text c="dark.9" lh="155%" lineClamp={2} fz="14 ">
              {challenge.description}
            </Text>
          </Stack>
          <Box>
            <Divider my="lg" />
            <Group justify="space-between">
              <Group gap="xs" lh="155%">
                <Text span c="gray.6">
                  Score:
                </Text>
                <Text span c="dark.9">
                  {challenge.score} points
                </Text>
              </Group>

              <Button variant="light">View Challenge</Button>
            </Group>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
}
