export function allPalindromicSubstrings(s: string): string[] {
  const result: string[] = [];
  const n = s.length;

  for (let center = 0; center < n; center++) {
    // Нечётные палиндромы
    let l = center;
    let r = center;
    while (l >= 0 && r < n && s[l] === s[r]) {
      result.push(s.slice(l, r + 1));
      l--;
      r++;
    }

    // Чётные палиндромы
    l = center;
    r = center + 1;
    while (l >= 0 && r < n && s[l] === s[r]) {
      result.push(s.slice(l, r + 1));
      l--;
      r++;
    }
  }

  return result;
}

// a  b  a  b  a  d
const sample = "ababad";
const palindromes = allPalindromicSubstrings(sample);
console.log(`Палиндромные подстроки в '${sample}':`, palindromes);
