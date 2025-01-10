import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CodeFold } from '../../components/CodeFold';

describe('CodeFold', () => {
  const mockStyles = {
    codeFold: 'code-fold-class',
    content: 'content-class',
  };

  const defaultProps = {
    styles: mockStyles,
    onBlockExpand: jest.fn(),
    blockNumber: 1,
    totalFoldedLines: 5,
    leftStartLineNumber: 10,
    rightStartLineNumber: 15,
  };

  it('renders default expand message', () => {
    const { getByText } = render(<CodeFold {...defaultProps} />);
    expect(getByText('Expand 5 lines')).toBeInTheDocument();
  });

  it('renders singular line message when totalFoldedLines is 1', () => {
    const props = { ...defaultProps, totalFoldedLines: 1 };
    const { getByText } = render(<CodeFold {...props} />);
    expect(getByText('Expand 1 line')).toBeInTheDocument();
  });

  it('calls onBlockExpand with blockNumber when clicked', () => {
    const onBlockExpand = jest.fn();
    const props = { ...defaultProps, onBlockExpand };
    const { getByText } = render(<CodeFold {...props} />);

    fireEvent.click(getByText('Expand 5 lines'));
    expect(onBlockExpand).toHaveBeenCalledWith(1);
  });

  it('uses custom renderer when provided', () => {
    const codeFoldMessageRenderer = jest.fn(() => <span>Custom Message</span>);
    const props = { ...defaultProps, codeFoldMessageRenderer };
    const { getByText } = render(<CodeFold {...props} />);

    expect(codeFoldMessageRenderer).toHaveBeenCalledWith(5, 10, 15);
    expect(getByText('Custom Message')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    const { container } = render(<CodeFold {...defaultProps} />);
    const tdElement = container.querySelector('td');
    expect(tdElement).toHaveClass('code-fold-class', 'content-class');
  });
}); 