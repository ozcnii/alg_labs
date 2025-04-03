function addWithoutPlus(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  const sum = a ^ b;
  const carry = (a & b) << 1;
  return addWithoutPlus(sum, carry);
}

console.log(addWithoutPlus(5, 3));
console.log(addWithoutPlus(1, 126));
