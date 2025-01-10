import { renderHook, act } from '@testing-library/react';
import { useExpandedBlocks } from '../../hooks/useExpandedBlocks';

describe('useExpandedBlocks', () => {
  it('initializes with empty expanded blocks', () => {
    const { result } = renderHook(() => useExpandedBlocks());
    expect(result.current.expandedBlocks).toEqual([]);
  });

  it('adds block to expanded blocks when onBlockExpand is called', () => {
    const { result } = renderHook(() => useExpandedBlocks());

    act(() => {
      result.current.onBlockExpand(1);
    });

    expect(result.current.expandedBlocks).toEqual([1]);
  });

  it('adds multiple blocks in sequence', () => {
    const { result } = renderHook(() => useExpandedBlocks());

    act(() => {
      result.current.onBlockExpand(1);
      result.current.onBlockExpand(2);
    });

    expect(result.current.expandedBlocks).toEqual([1, 2]);
  });

  it('resets blocks when resetCodeBlocks is called', () => {
    const { result } = renderHook(() => useExpandedBlocks());

    act(() => {
      result.current.onBlockExpand(1);
      result.current.onBlockExpand(2);
    });

    expect(result.current.expandedBlocks).toEqual([1, 2]);

    act(() => {
      const resetResult = result.current.resetCodeBlocks();
      expect(resetResult).toBe(true);
    });

    expect(result.current.expandedBlocks).toEqual([]);
  });

  it('returns false when resetting empty blocks', () => {
    const { result } = renderHook(() => useExpandedBlocks());

    act(() => {
      const resetResult = result.current.resetCodeBlocks();
      expect(resetResult).toBe(false);
    });

    expect(result.current.expandedBlocks).toEqual([]);
  });
}); 