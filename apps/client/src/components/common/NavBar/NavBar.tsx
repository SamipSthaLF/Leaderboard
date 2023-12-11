'use client';

import Link from 'next/link';

import { useState } from 'react';
import { IconFileCheck, IconLayoutGrid } from '@tabler/icons-react';

import { Avatar, Box, Divider, Flex, Group, NavLink, Stack, Text } from '@mantine/core';

import { Logo } from '@/components/common/Logo';

const data = [
  { link: '/challenges', label: 'Challenges', icon: IconLayoutGrid },
  { link: '/reviews', label: 'Reviews', icon: IconFileCheck }
];

export function NavBar() {
  const user = { name: 'Jessy Smith', email: 'jessysmith@leaderboard.com' };
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  return (
    <Flex direction="column" h="100%" justify="space-between">
      <Flex direction="column" p="calc(var(--mantine-spacing-md) * 2)">
        <Logo />

        <Group gap="0" mt="calc(var(--mantine-spacing-md) * 4 )">
          {data.map((item, index) => {
            const { icon: Icon, label, link } = item;
            const isActive = index === activeNavIndex;

            return (
              <NavLink
                fz="sm"
                fw="600"
                key={label}
                href={link}
                label={label}
                component={Link}
                active={isActive}
                leftSection={<Icon stroke={1.5} />}
                onClick={() => setActiveNavIndex(index)}
              />
            );
          })}
        </Group>
      </Flex>

      <Box>
        <Divider />
        <Flex gap="lg" align="center" p="calc(var(--mantine-spacing-md) * 2)">
          <Avatar alt="User" color="indigo" />
          <Stack gap="0">
            <Text size="md" fw="bold" lh="150%">
              {user.name}
            </Text>
            <Text size="sm" lh="155%">
              {user.email}
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
}
