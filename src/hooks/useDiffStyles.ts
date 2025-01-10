import { useMemo } from 'react';
import memoize from 'memoize-one';
import computeStyles from '../styles';
import { ReactDiffViewerStylesOverride, ReactDiffViewerStyles } from '../styles';

const memoizedComputeStyles = memoize(computeStyles);

export const useDiffStyles = (
  styles: ReactDiffViewerStylesOverride,
  useDarkTheme: boolean,
): ReactDiffViewerStyles => {
  return useMemo(
    () => memoizedComputeStyles(styles, useDarkTheme),
    [styles, useDarkTheme],
  );
}; 