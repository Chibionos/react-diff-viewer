import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LineNumber } from '../../components/LineNumber';
import { DiffType } from '../../compute-lines';

describe('LineNumber', () => {
  const mockStyles = {
    gutter: 'gutter-class',
    emptyGutter: 'empty-gutter-class',
    diffAdded: 'diff-added-class',
    diffRemoved: 'diff-removed-class',
    highlightedGutter: 'highlighted-gutter-class',
    lineNumber: 'line-number-class',
  };

  const defaultProps = {
    lineNumber: 1,
    type: DiffType.DEFAULT,
    styles: mockStyles,
    onLineNumberClick: jest.fn(),
    prefix: 'L',
    isHighlighted: false,
  };

  it('renders line number correctly', () => {
    const { getByText } = render(<LineNumber {...defaultProps} />);
    expect(getByText('1')).toBeInTheDocument();
  });

  it('applies correct classes for added line', () => {
    const props = { ...defaultProps, type: DiffType.ADDED };
    const { container } = render(<LineNumber {...props} />);
    expect(container.firstChild).toHaveClass('gutter-class');
    expect(container.firstChild).toHaveClass('diff-added-class');
  });

  it('applies correct classes for removed line', () => {
    const props = { ...defaultProps, type: DiffType.REMOVED };
    const { container } = render(<LineNumber {...props} />);
    expect(container.firstChild).toHaveClass('gutter-class');
    expect(container.firstChild).toHaveClass('diff-removed-class');
  });

  it('applies highlighted class when isHighlighted is true', () => {
    const props = { ...defaultProps, isHighlighted: true };
    const { container } = render(<LineNumber {...props} />);
    expect(container.firstChild).toHaveClass('highlighted-gutter-class');
  });

  it('calls onLineNumberClick with correct arguments when clicked', () => {
    const onLineNumberClick = jest.fn();
    const props = { ...defaultProps, onLineNumberClick };
    const { container } = render(<LineNumber {...props} />);
    
    fireEvent.click(container.firstChild as Element);
    expect(onLineNumberClick).toHaveBeenCalledWith('L-1', expect.any(Object));
  });

  it('does not call onLineNumberClick when lineNumber is 0', () => {
    const onLineNumberClick = jest.fn();
    const props = { ...defaultProps, lineNumber: 0, onLineNumberClick };
    const { container } = render(<LineNumber {...props} />);
    
    fireEvent.click(container.firstChild as Element);
    expect(onLineNumberClick).not.toHaveBeenCalled();
  });
}); 