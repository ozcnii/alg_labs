function zeroMatrix(matrix: number[][]): void {
  if (matrix.length === 0 || matrix[0].length === 0) return;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowZero = false;
  let firstColZero = false;

  for (let j = 0; j < cols; j++) {
    if (matrix[0][j] === 0) {
      firstRowZero = true;
      break;
    }
  }

  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) {
      firstColZero = true;
      break;
    }
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < rows; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 1; j < cols; j++) {
        matrix[i][j] = 0;
      }
    }
  }

  for (let j = 1; j < cols; j++) {
    if (matrix[0][j] === 0) {
      for (let i = 1; i < rows; i++) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRowZero) {
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
    }
  }

  if (firstColZero) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
    }
  }
}

const matrix = [
  [1, 2, 3],
  [4, 0, 6],
  [7, 8, 9],
];

zeroMatrix(matrix);
console.table(matrix);
// [
//   [1, 0, 3],
//   [0, 0, 0],
//   [7, 0, 9]
// ]
