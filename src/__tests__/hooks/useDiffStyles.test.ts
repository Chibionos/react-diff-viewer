import { renderHook } from '@testing-library/react';
import { useDiffStyles } from '../../hooks/useDiffStyles';

describe('useDiffStyles', () => {
  const mockStyleOverride = {
    variables: {
      dark: {
        diffViewerBackground: '#2e303c',
        diffViewerColor: '#FFF',
      },
      light: {
        diffViewerBackground: '#fff',
        diffViewerColor: '#212529',
      },
    },
  };

  it('returns light theme styles when useDarkTheme is false', () => {
    const { result } = renderHook(() => useDiffStyles(mockStyleOverride, false));
    expect(result.current.diffContainer).toBeDefined();
    expect(result.current).toMatchSnapshot();
  });

  it('returns dark theme styles when useDarkTheme is true', () => {
    const { result } = renderHook(() => useDiffStyles(mockStyleOverride, true));
    expect(result.current.diffContainer).toBeDefined();
    expect(result.current).toMatchSnapshot();
  });

  it('memoizes styles for same inputs', () => {
    const { result, rerender } = renderHook(
      ({ styleOverride, useDarkTheme }) => useDiffStyles(styleOverride, useDarkTheme),
      {
        initialProps: { styleOverride: mockStyleOverride, useDarkTheme: false },
      },
    );

    const firstResult = result.current;
    rerender({ styleOverride: mockStyleOverride, useDarkTheme: false });
    expect(result.current).toBe(firstResult);
  });

  it('updates styles when inputs change', () => {
    const { result, rerender } = renderHook(
      ({ styleOverride, useDarkTheme }) => useDiffStyles(styleOverride, useDarkTheme),
      {
        initialProps: { styleOverride: mockStyleOverride, useDarkTheme: false },
      },
    );

    const firstResult = result.current;
    rerender({ styleOverride: mockStyleOverride, useDarkTheme: true });
    expect(result.current).not.toBe(firstResult);
  });
}); 