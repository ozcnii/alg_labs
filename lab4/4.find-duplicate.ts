export function findDuplicate(numbers: number[]): number {
  const n = numbers.length - 1;
  numbers[n] = -1;
  //  1 ... n

  for (let i = 0; i < n; i++) {
    const index = Math.abs(numbers[i]) - 1;

    if (numbers[index] < 0) {
      numbers[n] = index + 1;
    } else {
      numbers[index] = -numbers[index];
    }
  }

  // восстановление массива (если нужно)
  for (let i = 0; i < n; i++) {
    numbers[i] = Math.abs(numbers[i]);
  }

  return numbers[n];
}

// prettier-ignore
const arr = [3, 1, 3, 4, 2, ];
console.log(findDuplicate(arr)); // 3
