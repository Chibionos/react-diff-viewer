import * as React from 'react';
import cn from 'classnames';
import { ReactDiffViewerStyles } from '../styles';
import { DiffType } from '../compute-lines';

interface LineNumberProps {
  lineNumber: number;
  type: DiffType;
  styles: ReactDiffViewerStyles;
  onLineNumberClick: (lineId: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
  prefix: string;
  isHighlighted: boolean;
}

export const LineNumber: React.FC<LineNumberProps> = ({
  lineNumber,
  type,
  styles,
  onLineNumberClick,
  prefix,
  isHighlighted,
}) => {
  const lineNumberTemplate = `${prefix}-${lineNumber}`;
  const added = type === DiffType.ADDED;
  const removed = type === DiffType.REMOVED;

  const gutterClassNames = {
    [styles.emptyGutter || '']: !lineNumber,
    [styles.diffAdded || '']: added,
    [styles.diffRemoved || '']: removed,
    [styles.highlightedGutter || '']: isHighlighted,
  };

  return (
    <td
      onClick={(e) => lineNumber && onLineNumberClick(lineNumberTemplate, e)}
      className={cn(styles.gutter || '', gutterClassNames)}
    >
      <pre className={styles.lineNumber || ''}>{lineNumber}</pre>
    </td>
  );
};
