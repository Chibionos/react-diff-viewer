import React from 'react';
import { render } from '@testing-library/react';
import { InlineView } from '../../components/InlineView';
import { DiffType } from '../../compute-lines';

describe('InlineView', () => {
  const mockStyles = {
    content: 'content-class',
  };

  const mockLineInformation = {
    left: {
      lineNumber: 1,
      type: DiffType.DEFAULT,
      value: 'left content',
    },
    right: {
      lineNumber: 1,
      type: DiffType.ADDED,
      value: 'right content',
    },
  };

  const renderComponent = (props = {}) => {
    const defaultProps = {
      lineInformation: mockLineInformation,
      styles: mockStyles,
      onLineNumberClick: jest.fn(),
      highlightLines: [],
    };

    return render(
      <InlineView
        lineInformation={defaultProps.lineInformation}
        styles={defaultProps.styles}
        onLineNumberClick={defaultProps.onLineNumberClick}
        highlightLines={defaultProps.highlightLines}
        {...props}
      />,
    );
  };

  it('renders content when right type is not REMOVED', () => {
    const { getByText } = renderComponent();
    expect(getByText('left content')).toBeInTheDocument();
  });

  it('returns null when right type is REMOVED', () => {
    const lineInfo = {
      ...mockLineInformation,
      right: {
        ...mockLineInformation.right,
        type: DiffType.REMOVED,
      },
    };

    const { container } = renderComponent({
      lineInformation: lineInfo,
    });

    expect(container.firstChild).toBeNull();
  });

  it('returns null when line information is incomplete', () => {
    const incompleteLineInfo = {
      left: null,
      right: mockLineInformation.right,
    };

    const { container } = renderComponent({
      lineInformation: incompleteLineInfo,
    });

    expect(container.firstChild).toBeNull();
  });

  it('uses custom render content when provided', () => {
    const renderContent = (text: string) => <span data-testid="custom">{text.toUpperCase()}</span>;
    const { getByTestId } = renderComponent({ renderContent });
    expect(getByTestId('custom')).toHaveTextContent('LEFT CONTENT');
  });
}); 