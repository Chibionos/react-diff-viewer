import React, { FC } from 'react';
import cn from 'classnames';
import { ReactDiffViewerStyles } from '../styles';
import { DiffInformation, DiffType } from '../compute-lines';
import { WordDiff } from './WordDiff';
import { LineNumber } from './LineNumber';
import { LineNumberPrefix } from '../types';

interface LineProps {
  lineNumber: number;
  type: DiffType;
  prefix: LineNumberPrefix;
  value: string | DiffInformation[];
  additionalLineNumber?: number;
  additionalPrefix?: LineNumberPrefix;
  styles: ReactDiffViewerStyles;
  onLineNumberClick: (lineId: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
  renderContent?: (source: string) => React.ReactElement;
  hideLineNumbers?: boolean;
  highlightLines: string[];
}

export const Line: FC<LineProps> = ({
  lineNumber,
  type,
  prefix,
  value,
  additionalLineNumber,
  additionalPrefix,
  styles,
  onLineNumberClick,
  renderContent: contentRenderer,
  hideLineNumbers,
  highlightLines,
}) => {
  const lineNumberTemplate = `${prefix}-${lineNumber}`;
  const additionalLineNumberTemplate = additionalLineNumber
    ? `${additionalPrefix}-${additionalLineNumber}`
    : '';
  const highlightLine = highlightLines.includes(lineNumberTemplate)
    || (additionalLineNumberTemplate && highlightLines.includes(additionalLineNumberTemplate));
  const added = type === DiffType.ADDED;
  const removed = type === DiffType.REMOVED;

  const renderLineContent = (content: string | DiffInformation[]): React.ReactNode => {
    if (Array.isArray(content)) {
      return <WordDiff diffArray={content} styles={styles} renderContent={contentRenderer} />;
    }
    if (contentRenderer) {
      return contentRenderer(content);
    }
    return content;
  };

  const diffAddedClass = styles.diffAdded || '';
  const diffRemovedClass = styles.diffRemoved || '';
  const highlightedLineClass = styles.highlightedLine || '';
  const contentClass = styles.content || '';

  const classNames = cn({
    [diffAddedClass]: added && diffAddedClass !== '',
    [diffRemovedClass]: removed && diffRemovedClass !== '',
    [highlightedLineClass]: highlightLine && highlightedLineClass !== '',
  });

  return (
    <tr className={classNames}>
      {!hideLineNumbers && (
        <LineNumber
          lineNumber={lineNumber}
          type={type}
          styles={styles}
          onLineNumberClick={onLineNumberClick}
          prefix={prefix}
          isHighlighted={Boolean(highlightLine)}
        />
      )}
      <td className={contentClass}>
        <pre>{renderLineContent(value)}</pre>
      </td>
    </tr>
  );
};
