import * as React from 'react';
import cn from 'classnames';
import { ReactDiffViewerStyles } from '../styles';

interface CodeFoldProps {
  styles: ReactDiffViewerStyles;
  onBlockExpand: (id: number) => void;
  blockNumber: number;
  totalFoldedLines: number;
  leftStartLineNumber: number;
  rightStartLineNumber: number;
  codeFoldMessageRenderer?: (
    totalFoldedLines: number,
    leftStartLineNumber: number,
    rightStartLineNumber: number,
  ) => JSX.Element;
}

export const CodeFold: React.FC<CodeFoldProps> = ({
  styles,
  onBlockExpand,
  blockNumber,
  totalFoldedLines,
  leftStartLineNumber,
  rightStartLineNumber,
  codeFoldMessageRenderer,
}) => {
  const handleClick = React.useCallback(() => {
    onBlockExpand(blockNumber);
  }, [blockNumber, onBlockExpand]);

  return (
    <tr>
      <td
        className={cn(styles.codeFold, styles.content)}
        onClick={handleClick}
        colSpan={2}
      >
        {codeFoldMessageRenderer ? (
          codeFoldMessageRenderer(
            totalFoldedLines,
            leftStartLineNumber,
            rightStartLineNumber,
          )
        ) : (
          <span>
            {`Expand ${totalFoldedLines} ${
              totalFoldedLines === 1 ? 'line' : 'lines'
            }`}
          </span>
        )}
      </td>
    </tr>
  );
};
