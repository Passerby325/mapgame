import { CellType, MazeType, Position } from '../types/maze';

export function generateMaze(size: number = 10, complexity: number = 0.5): MazeType {
  // 添加复杂度参数来影响迷宫生成
  const shouldAddPath = () => Math.random() > complexity;
  
  // 初始化迷宫网格
  const grid: CellType[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
      visited: false,
    }))
  );

  // 使用深度优先搜索生成迷宫
  const stack: Position[] = [];
  const start: Position = { x: 0, y: 0 };
  let current = start;
  grid[current.y][current.x].visited = true;

  function getUnvisitedNeighbors(pos: Position): Position[] {
    const neighbors: Position[] = [];
    const directions = [
      { x: 0, y: -1, wall: 'top' },    // 上
      { x: 1, y: 0, wall: 'right' },   // 右
      { x: 0, y: 1, wall: 'bottom' },  // 下
      { x: -1, y: 0, wall: 'left' }    // 左
    ];

    for (const dir of directions) {
      const newX = pos.x + dir.x;
      const newY = pos.y + dir.y;
      if (
        newX >= 0 && newX < size &&
        newY >= 0 && newY < size &&
        !grid[newY][newX].visited
      ) {
        neighbors.push({ x: newX, y: newY });
      }
    }
    return neighbors;
  }

  while (true) {
    const neighbors = getUnvisitedNeighbors(current);
    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      stack.push(current);

      // 根据复杂度可能添加额外路径
      if (shouldAddPath()) {
        const otherNeighbors = neighbors.filter(n => n !== next);
        if (otherNeighbors.length > 0) {
          const extraPath = otherNeighbors[Math.floor(Math.random() * otherNeighbors.length)];
          // 添加额外路径
          if (extraPath.x > current.x) {
            grid[current.y][current.x].right = false;
            grid[extraPath.y][extraPath.x].left = false;
          } else if (extraPath.x < current.x) {
            grid[current.y][current.x].left = false;
            grid[extraPath.y][extraPath.x].right = false;
          } else if (extraPath.y > current.y) {
            grid[current.y][current.x].bottom = false;
            grid[extraPath.y][extraPath.x].top = false;
          } else {
            grid[current.y][current.x].top = false;
            grid[extraPath.y][extraPath.x].bottom = false;
          }
          grid[extraPath.y][extraPath.x].visited = true;
        }
      }

      // 移除墙壁
      if (next.x > current.x) {
        grid[current.y][current.x].right = false;
        grid[next.y][next.x].left = false;
      } else if (next.x < current.x) {
        grid[current.y][current.x].left = false;
        grid[next.y][next.x].right = false;
      } else if (next.y > current.y) {
        grid[current.y][current.x].bottom = false;
        grid[next.y][next.x].top = false;
      } else {
        grid[current.y][current.x].top = false;
        grid[next.y][next.x].bottom = false;
      }

      current = next;
      grid[current.y][current.x].visited = true;
    } else if (stack.length > 0) {
      current = stack.pop()!;
    } else {
      break;
    }
  }

  // 设置起点和终点
  const end: Position = { x: size - 1, y: size - 1 };
  grid[start.y][start.x].isStart = true;
  grid[end.y][end.x].isEnd = true;

  return { grid, start, end };
} 