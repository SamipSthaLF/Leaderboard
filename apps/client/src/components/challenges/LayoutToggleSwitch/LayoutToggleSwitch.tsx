'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { ActionIcon, ActionIconGroup, Paper } from '@mantine/core';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';

type ViewMode = 'grid' | 'list';

const layouts = [
  {
    label: 'grid',
    ariaLabel: 'Layout Grid',
    icon: IconLayoutGrid
  },
  {
    label: 'list',
    ariaLabel: 'Layout List',
    icon: IconLayoutList
  }
] as const;

export function LayoutToggleSwitch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLayout = searchParams.get('layout') || 'list';

  function onLayoutChange(layout: ViewMode) {
    return router.replace(`/challenges?layout=${layout}`, { scroll: false });
  }

  return (
    <Paper bg="gray.2" p="xs">
      <ActionIconGroup>
        {layouts.map((layout) => {
          const { label, ariaLabel, icon: Icon } = layout;
          const variant = currentLayout === label ? 'white' : 'transparent';

          return (
            <ActionIcon
              size="md"
              color="dark.8"
              variant={variant}
              key={layout.label}
              aria-label={ariaLabel}
              onClick={() => onLayoutChange(label)}
            >
              <Icon size={18} />
            </ActionIcon>
          );
        })}
      </ActionIconGroup>
    </Paper>
  );
}
