import React from 'react';
import { render } from '@testing-library/react';
import { SplitView } from '../../components/SplitView';
import { DiffType } from '../../compute-lines';

describe('SplitView', () => {
  const mockStyles = {
    splitView: 'split-view-class',
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
      <SplitView
        lineInformation={defaultProps.lineInformation}
        styles={defaultProps.styles}
        onLineNumberClick={defaultProps.onLineNumberClick}
        highlightLines={defaultProps.highlightLines}
        {...props}
      />,
    );
  };

  it('renders both left and right content', () => {
    const { getByText } = renderComponent();
    expect(getByText('left content')).toBeInTheDocument();
    expect(getByText('right content')).toBeInTheDocument();
  });

  it('applies split view class to containers', () => {
    const { container } = renderComponent();
    const tdElements = container.querySelectorAll('td');
    tdElements.forEach((td) => {
      expect(td).toHaveClass('split-view-class');
    });
  });

  it('handles missing line information gracefully', () => {
    const incompleteLineInfo = {
      left: null,
      right: {
        lineNumber: 1,
        type: DiffType.ADDED,
        value: 'right only',
      },
    };

    const { getByText } = renderComponent({
      lineInformation: incompleteLineInfo,
    });

    expect(getByText('right only')).toBeInTheDocument();
  });

  it('uses custom render content when provided', () => {
    const renderContent = (text: string) => <span data-testid="custom">{text.toUpperCase()}</span>;
    const { getAllByTestId } = renderComponent({ renderContent });
    const customElements = getAllByTestId('custom');
    
    expect(customElements[0]).toHaveTextContent('LEFT CONTENT');
    expect(customElements[1]).toHaveTextContent('RIGHT CONTENT');
  });
}); 