"use client";

import {
  IconUser,
  IconLogout,
  IconTrophy,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Box, Flex, Group, NavLink, Title } from "@mantine/core";
import { useState } from "react";

const data = [
  { link: "/challenges", label: "Challenges", icon: IconTrophy },
  { link: "/users", label: "Users", icon: IconUser },
  { link: "/settings", label: "Settings", icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState(0);

  const links = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      href={item.link}
      leftSection={<item.icon stroke={1.5} />}
      onClick={() => setActive(index)}
      variant="filled"
    />
  ));

  return (
    <Flex direction="column" justify="space-between" h="100%">
      <Flex direction="column">
        <Group
          justify="space-between"
          pb="var(--mantine-spacing-md)"
          mb="calc(var(--mantine-spacing-md) * 1.5)"
        >
          <Title order={3}>EngLead</Title>
        </Group>
        {links}
      </Flex>

      <Box pb="var(--mantine-spacing-md)" mb="var(--mantine-spacing-md)">
        <NavLink
          label="Change account"
          href="/change-account"
          leftSection={<IconSwitchHorizontal stroke={1.5} />}
        />

        <NavLink
          label="Logout"
          href="/logout"
          leftSection={<IconLogout stroke={1.5} />}
        />
      </Box>
    </Flex>
  );
}
