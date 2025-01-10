import * as React from 'react';
import { Line } from './Line';
import { DiffType, LineInformation } from '../compute-lines';
import { CommonProps, LineNumberPrefix } from '../types';

interface SplitViewProps extends CommonProps {
  lineInformation: LineInformation;
}

export const SplitView: React.FC<SplitViewProps> = ({
  lineInformation: { left, right },
  styles,
  onLineNumberClick,
  renderContent,
  hideLineNumbers,
  highlightLines,
}) => (
  <tr>
    <td className={styles.splitView}>
      <Line
        lineNumber={left?.lineNumber || 0}
        type={left?.type || DiffType.DEFAULT}
        prefix={LineNumberPrefix.LEFT}
        value={left?.value || ''}
        styles={styles}
        onLineNumberClick={onLineNumberClick}
        renderContent={renderContent}
        hideLineNumbers={hideLineNumbers}
        highlightLines={highlightLines}
      />
    </td>
    <td className={styles.splitView}>
      <Line
        lineNumber={right?.lineNumber || 0}
        type={right?.type || DiffType.DEFAULT}
        prefix={LineNumberPrefix.RIGHT}
        value={right?.value || ''}
        styles={styles}
        onLineNumberClick={onLineNumberClick}
        renderContent={renderContent}
        hideLineNumbers={hideLineNumbers}
        highlightLines={highlightLines}
      />
    </td>
  </tr>
);
