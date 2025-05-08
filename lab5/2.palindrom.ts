function manacher(s: string): number[] {
  const t = "#" + s.split("").join("#") + "#";
  const n = t.length;
  const p = new Array(n).fill(0);

  let center: number = 0;
  let right: number = 0;

  for (let i = 0; i < n; i++) {
    if (i < right) {
      p[i] = Math.min(right - i, p[2 * center - i]);
    }

    let left: number = i - (p[i] + 1);
    let rightBound: number = i + (p[i] + 1);

    while (left >= 0 && rightBound < n && t[left] === t[rightBound]) {
      p[i]++;
      left--;
      rightBound++;
    }

    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  return p;
}

function countPalindromes(s: string): number {
  const p: number[] = manacher(s);
  let count: number = 0;

  for (let i = 0; i < p.length; i++) {
    count += Math.floor(p[i] / 2) + (p[i] % 2);
  }

  return count;
}

const str: string = "ababad";
console.log(countPalindromes(str));
