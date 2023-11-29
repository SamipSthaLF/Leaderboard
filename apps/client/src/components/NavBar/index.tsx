'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Flex, Group, NavLink, Title } from '@mantine/core';
import { IconUser, IconLogout, IconTrophy, IconSettings, IconSwitchHorizontal } from '@tabler/icons-react';

const data = [
  { link: '/challenges', label: 'Challenges', icon: IconTrophy },
  { link: '/users', label: 'Users', icon: IconUser },
  { link: '/settings', label: 'Settings', icon: IconSettings }
];

export function Navbar() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  return (
    <Flex direction="column" justify="space-between" h="100%">
      <Flex direction="column">
        <Group justify="space-between" pb="md" mb="calc(var(--mantine-spacing-md) * 1.5)">
          <Title order={3}>EngLead</Title>
        </Group>

        <Group gap="0">
          {data.map((item, index) => {
            const { icon: Icon, label, link } = item;

            return (
              <NavLink
                key={label}
                href={link}
                label={label}
                variant="filled"
                component={Link}
                active={index === activeNavIndex}
                leftSection={<Icon stroke={1.5} />}
                onClick={() => setActiveNavIndex(index)}
              />
            );
          })}
        </Group>
      </Flex>

      <Group gap="0" mb="md">
        <NavLink label="Change Account" href="/change-account" leftSection={<IconSwitchHorizontal stroke={1.5} />} />
        <NavLink label="Logout" href="/logout" leftSection={<IconLogout stroke={1.5} />} />
      </Group>
    </Flex>
  );
}
