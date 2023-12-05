import NextImage from 'next/image';
import { Box, Divider, Flex, Group, Image, Paper, Stack, Text, Title } from '@mantine/core';

interface Challenge {
  title: string;
  score: number;
  description: string;
  coverImgSrc: string;
}

interface Props {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: Readonly<Props>) {
  return (
    <Paper component="article" p="24px" radius="md" shadow="card" maw="850px" mx="auto" withBorder>
      <Flex gap="lg">
        <Image
          src={challenge.coverImgSrc}
          alt="Challenge Cover"
          width="287"
          height="184"
          radius="md"
          component={NextImage}
        />
        <Flex direction="column" justify="space-between">
          <Stack gap="lg">
            <Title order={2} c="cascade-blue.9">
              {challenge.title}
            </Title>
            <Text c="dark.9" lh="155%" mb="32px" lineClamp={2}>
              {challenge.description}
            </Text>
          </Stack>
          <Box>
            <Divider my="lg" />
            <Group lh="155%" justify="space-between">
              <Text span c="gray.6">
                Score:
              </Text>
              <Text span c="dark.9">
                {challenge.score} points
              </Text>
            </Group>
          </Box>
        </Flex>
      </Flex>
    </Paper>
  );
}
