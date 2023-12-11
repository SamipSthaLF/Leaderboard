import { rem, createTheme } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'cascade-blue',
  colors: {
    'cascade-blue': [
      '#edf1fd',
      '#d7def5',
      '#abbaec',
      '#7c94e4',
      '#5674de',
      '#4060db',
      '#3356db',
      '#2747c2',
      '#203eae',
      '#143699'
    ],
    'Cerulean-Dream': [
      '#102B7B',
      '#102B8B',
      '#464EA5',
      '#465EA5',
      '#7274D1',
      '#7474D1',
      '#9E9DFE',
      '#9EADEE',
      '#CBC8FF',
      '#CACEFF'
    ]
  },
  defaultRadius: 'sm',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    sm: '0px 7px 7px -5px rgba(0, 0, 0, 0.04), 0px 10px 15px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px'
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '32px'
  },
  headings: {
    fontFamily: 'SF Pro Display, sans-serif',
    sizes: {
      h1: { fontSize: rem(22), fontWeight: '700', lineHeight: '140%' },
      h2: { fontSize: rem(22), fontWeight: '700', lineHeight: '140%' }
    }
  }
}) as Partial<MantineTheme>;
