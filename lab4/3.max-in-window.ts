function maxInWindow(numbers: number[], k: number): number[] {
  if (numbers.length === 0 || k === 0) return [];

  const result: number[] = [];
  const idxDeq: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    if (idxDeq.length > 0 && idxDeq[0] === i - k) {
      idxDeq.shift();
    }

    while (idxDeq.length > 0 && numbers[idxDeq.at(-1)!] < numbers[i]) {
      idxDeq.pop();
    }

    idxDeq.push(i);

    if (i >= k - 1) {
      result.push(numbers[idxDeq[0]]);
    }
  }

  return result;
}

const nums = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log(maxInWindow(nums, k)); // [3, 3, 5, 5, 6, 7]
