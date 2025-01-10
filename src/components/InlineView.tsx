import * as React from 'react';
import { Line } from './Line';
import { DiffType, LineInformation } from '../compute-lines';
import { CommonProps, LineNumberPrefix } from '../types';

interface InlineViewProps extends CommonProps {
  lineInformation: LineInformation;
}

export const InlineView: React.FC<InlineViewProps> = ({
  lineInformation: { left, right },
  styles,
  onLineNumberClick,
  renderContent,
  hideLineNumbers,
  highlightLines,
}) => {
  if (!left || !right) {
    return null;
  }

  if (right.type === DiffType.REMOVED) {
    return null;
  }

  return (
    <Line
      lineNumber={left.lineNumber || 0}
      type={left.type || DiffType.DEFAULT}
      prefix={LineNumberPrefix.LEFT}
      value={left.value || ''}
      additionalLineNumber={right.lineNumber}
      additionalPrefix={LineNumberPrefix.RIGHT}
      styles={styles}
      onLineNumberClick={onLineNumberClick}
      renderContent={renderContent}
      hideLineNumbers={hideLineNumbers}
      highlightLines={highlightLines}
    />
  );
};
