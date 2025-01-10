import * as React from 'react';
import cn from 'classnames';
import { ReactDiffViewerStyles } from '../styles';
import { DiffInformation, DiffType } from '../compute-lines';

interface WordDiffProps {
  diffArray: DiffInformation[];
  styles: ReactDiffViewerStyles;
  renderContent?: (chunk: string) => React.ReactElement;
}

export const WordDiff: React.FC<WordDiffProps> = ({
  diffArray,
  styles,
  renderContent,
}) => (
  <>
    {diffArray.map((wordDiff, index) => {
      const value = wordDiff.value as string;
      const key = `${wordDiff.type}-${value}-${index}`;
      return (
        <span
          key={key}
          className={cn(styles.wordDiff, {
            [styles.wordAdded || '']: wordDiff.type === DiffType.ADDED,
            [styles.wordRemoved || '']: wordDiff.type === DiffType.REMOVED,
          })}
        >
          {renderContent ? renderContent(value) : value}
        </span>
      );
    })}
  </>
);
