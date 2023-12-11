import type { CardLayout } from '@/types/challenges';

export function getStylesByCardLayout(cardLayout: CardLayout) {
  if (cardLayout === 'list') {
    return {
      containerFlexDirection: 'row',
      coverImageHeight: '184',
      titleFontSize: '22',
      imageWrapperStyles: { flexBasis: '287px' },
      contentWrapperStyles: { flex: '1' }
    } as const;
  }

  return {
    containerFlexDirection: 'column',
    coverImageHeight: '90',
    titleFontSize: '16',
    imageWrapperStyles: { flexBasis: 'auto' },
    contentWrapperStyles: { flex: 'initial' }
  } as const;
}
