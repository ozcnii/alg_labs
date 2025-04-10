function solution(matrix: number[][], row: number, col: number): void {
  if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
    return;
  }

  if (matrix[row][col] !== 0) {
    return;
  }

  for (let j = 0; j < matrix[row].length; j++) {
    matrix[row][j] = 0;
  }

  for (let i = 0; i < matrix.length; i++) {
    matrix[i][col] = 0;
  }
}

const matrix = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 8, 9],
];

solution(matrix, 1, 1);

console.table(matrix);
/*
[
    [1, 0, 3],
    [0, 0, 0],
    [7, 0, 9]
]
*/
