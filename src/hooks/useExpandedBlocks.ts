import { useState, useCallback } from 'react';

interface ExpandedBlocksHook {
  expandedBlocks: number[];
  resetCodeBlocks: () => boolean;
  onBlockExpand: (id: number) => void;
}

export const useExpandedBlocks = (): ExpandedBlocksHook => {
  const [expandedBlocks, setExpandedBlocks] = useState<number[]>([]);

  const resetCodeBlocks = useCallback((): boolean => {
    if (expandedBlocks.length > 0) {
      setExpandedBlocks([]);
      return true;
    }
    return false;
  }, [expandedBlocks]);

  const onBlockExpand = useCallback((id: number): void => {
    setExpandedBlocks((prev: number[]) => [...prev, id]);
  }, []);

  return {
    expandedBlocks,
    resetCodeBlocks,
    onBlockExpand,
  };
};
