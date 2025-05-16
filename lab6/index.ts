function unboundedKnapsack(
  W: number,
  weights: number[],
  costs: number[]
): number {
  const A: number[] = new Array(W + 1).fill(0);

  for (let w = 1; w <= W; w++) {
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] <= w) {
        A[w] = Math.max(A[w], A[w - weights[i]] + costs[i]);
      }
    }
  }

  return A[W];
}

function zeroOneKnapsack(
  W: number,
  weights: number[],
  costs: number[]
): number {
  const A: number[] = new Array(W + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let w = W; w >= weights[i]; w--) {
      A[w] = Math.max(A[w], A[w - weights[i]] + costs[i]);
    }
  }

  return A[W];
}

const W = 10;
const weights = [3, 4, 5];
const costs = [70, 50, 60];

console.log("С повторениями:", unboundedKnapsack(W, weights, costs));
console.log("Без повторений:", zeroOneKnapsack(W, weights, costs));
