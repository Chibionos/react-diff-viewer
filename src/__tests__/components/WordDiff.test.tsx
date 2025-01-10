import React from 'react';
import { render } from '@testing-library/react';
import { WordDiff } from '../../components/WordDiff';
import { DiffType } from '../../compute-lines';

describe('WordDiff', () => {
  const mockStyles = {
    wordDiff: 'word-diff-class',
    wordAdded: 'word-added-class',
    wordRemoved: 'word-removed-class',
  };

  const mockDiffArray = [
    { type: DiffType.DEFAULT, value: 'unchanged', lineNumber: 1 },
    { type: DiffType.ADDED, value: 'added', lineNumber: 2 },
    { type: DiffType.REMOVED, value: 'removed', lineNumber: 3 },
  ];

  const renderWordDiff = (props = {}) => {
    const defaultProps = {
      diffArray: mockDiffArray,
      styles: mockStyles,
    };
    return render(<WordDiff {...defaultProps} {...props} />);
  };

  it('renders all diff items', () => {
    const { getByText } = renderWordDiff();
    expect(getByText('unchanged')).toBeInTheDocument();
    expect(getByText('added')).toBeInTheDocument();
    expect(getByText('removed')).toBeInTheDocument();
  });

  it('applies correct classes for added words', () => {
    const { getByText } = renderWordDiff();
    const addedElement = getByText('added');
    expect(addedElement).toHaveClass('word-diff-class');
    expect(addedElement).toHaveClass('word-added-class');
  });

  it('applies correct classes for removed words', () => {
    const { getByText } = renderWordDiff();
    const removedElement = getByText('removed');
    expect(removedElement).toHaveClass('word-diff-class');
    expect(removedElement).toHaveClass('word-removed-class');
  });

  it('uses renderContent when provided', () => {
    const renderContent = (text: string) => <span data-testid="custom">{text.toUpperCase()}</span>;
    const { getByTestId } = renderWordDiff({ renderContent });
    const customElement = getByTestId('custom');
    expect(customElement).toHaveTextContent('UNCHANGED');
  });
}); 