import Image from 'next/image';
import { Group, Text } from '@mantine/core';

type Props = React.ComponentProps<typeof Group>;

export function Logo({ ...props }: Readonly<Props>) {
  return (
    <Group gap="sm" align="center" {...props}>
      <Image src="/logo.svg" alt="Logo" height="28" width="28" />
      <Text span c="cascade-blue.9" fw="700" lh="140%" fz="22">
        Leaderboard
      </Text>
    </Group>
  );
}
