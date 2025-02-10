export type CellType = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
  visited: boolean;
  isStart?: boolean;
  isEnd?: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type MazeType = {
  grid: CellType[][];
  start: Position;
  end: Position;
};

export type GameState = {
  currentPosition: Position;
  steps: number;
  completed: boolean;
}; 