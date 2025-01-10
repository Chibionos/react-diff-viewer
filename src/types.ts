import * as React from 'react';
import { DiffMethod } from './compute-lines';
import { ReactDiffViewerStyles } from './styles';

export enum LineNumberPrefix {
  LEFT = 'L',
  RIGHT = 'R',
}

export interface CommonProps {
  styles: ReactDiffViewerStyles;
  onLineNumberClick: (lineId: string, event: React.MouseEvent<HTMLTableCellElement>) => void;
  renderContent?: (source: string) => JSX.Element;
  hideLineNumbers?: boolean;
  highlightLines: string[];
}

export interface ReactDiffViewerProps extends CommonProps {
  oldValue: string;
  newValue: string;
  splitView?: boolean;
  linesOffset?: number;
  disableWordDiff?: boolean;
  compareMethod?: DiffMethod;
  extraLinesSurroundingDiff?: number;
  showDiffOnly?: boolean;
  codeFoldMessageRenderer?: (
    totalFoldedLines: number,
    leftStartLineNumber: number,
    rightStartLineNumber: number,
  ) => JSX.Element;
  leftTitle?: string | JSX.Element;
  rightTitle?: string | JSX.Element;
  useDarkTheme?: boolean;
}
