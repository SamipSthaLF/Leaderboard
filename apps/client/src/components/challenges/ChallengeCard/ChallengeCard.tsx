import NextImage from 'next/image';
import {
  Box,
  Flex,
  Menu,
  Text,
  Title,
  Group,
  Image,
  Paper,
  Stack,
  Button,
  Divider,
  MenuItem,
  HoverCard,
  ActionIcon,
  MenuTarget,
  MenuDropdown,
  HoverCardTarget,
  HoverCardDropdown
} from '@mantine/core';
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react';

import type { CardLayout, Challenge } from '@/types/challenges';

import { getStylesByCardLayout } from '@/utils/challenges';

import { ChallengesHoverCard } from '@/components/challenges/ChallengesHoverCard';

interface Props {
  challenge: Challenge;
  cardLayout: CardLayout;
}

export function ChallengeCard({ cardLayout, challenge }: Readonly<Props>) {
  const { containerFlexDirection, coverImageHeight, titleFontSize, imageWrapperStyles, contentWrapperStyles } =
    getStylesByCardLayout(cardLayout);

  return (
    <Paper component="article" p="xl" radius="md" shadow="sm" maw="850px" mx="auto" withBorder>
      <Flex direction={containerFlexDirection} gap="lg">
        <Box component="figure" h={coverImageHeight} w="287" pos="relative" style={imageWrapperStyles}>
          <Image src={challenge.coverImgSrc} alt={challenge.title} radius="md" component={NextImage} fill />
        </Box>

        <Flex direction="column" justify="space-between" style={contentWrapperStyles}>
          <Stack gap="lg">
            <Group justify="space-between" align="center">
              <HoverCard position="right-start">
                <HoverCardTarget>
                  <Title order={2} c="cascade-blue.9" fz={titleFontSize} style={{ cursor: 'default' }}>
                    {challenge.title}
                  </Title>
                </HoverCardTarget>
                <HoverCardDropdown>
                  <ChallengesHoverCard challenge={challenge} />
                </HoverCardDropdown>
              </HoverCard>
              <Menu position="left-start" offset={0} radius="md" shadow="sm">
                <MenuTarget>
                  <ActionIcon p="0" size="md" variant="transparent" aria-label="Menu" color="gray.5">
                    <IconDotsVertical size={20} stroke={1.5} />
                  </ActionIcon>
                </MenuTarget>

                <MenuDropdown w="150" p="0" fz="sm">
                  <MenuItem p="0">
                    <Flex component="span" gap="sm" px="md" py="sm" align="center">
                      <ActionIcon color="gray.7" variant="transparent">
                        <IconPencil size={20} />
                      </ActionIcon>
                      <Text c="gray.7" fz="sm">
                        Edit
                      </Text>
                    </Flex>
                  </MenuItem>

                  <MenuItem p="0">
                    <Flex component="span" gap="sm" px="md" py="sm" align="center">
                      <ActionIcon color="red.9" variant="transparent">
                        <IconTrash size={20} />
                      </ActionIcon>
                      <Text c="gray.7" fz="sm">
                        Delete
                      </Text>
                    </Flex>
                  </MenuItem>
                </MenuDropdown>
              </Menu>
            </Group>
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
