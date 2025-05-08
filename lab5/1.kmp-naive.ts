function naiveSearch(text: string, pattern: string): number[] {
  const occurrences: number[] = [];
  const n = text.length;
  const m = pattern.length;

  for (let i = 0; i <= n - m; i++) {
    let match = true;

    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }

    if (match) {
      occurrences.push(i);
    }
  }

  return occurrences;
}

function computePrefix(pattern: string): number[] {
  const prefix: number[] = new Array(pattern.length).fill(0);
  let length = 0;

  // a b a c a b a
  // 0 0 1 0 1 2 3

  for (let i = 1; i < pattern.length; i++) {
    while (length > 0 && pattern[i] !== pattern[length]) {
      length = prefix[length - 1];
    }
    if (pattern[i] === pattern[length]) {
      length++;
      prefix[i] = length;
    } else {
      prefix[i] = 0;
    }
  }

  return prefix;
}

function kmpSearch(text: string, pattern: string): number[] {
  const prefix = computePrefix(pattern);

  const occurrences: number[] = [];
  let j = 0; // индекс в pattern

  // a b c a b e a b c a b c a b d
  // a b c a b d

  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = prefix[j - 1];
    }
    if (text[i] === pattern[j]) {
      j++;
    }
    if (j === pattern.length) {
      occurrences.push(i - pattern.length + 1);
      j = prefix[j - 1];
    }
  }

  return occurrences;
}

function generateRandomString(length: number, chars: string): string {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function runPerformanceTests() {
  const testCases = [
    {
      name: "Частые короткие повторения",
      text: "ABABABABAB".repeat(100_000),
      pattern: "ABAB",
    },
    {
      name: "Длинные повторяющиеся паттерны",
      text: ("XYZ" + "123".repeat(10)).repeat(50_000),
      pattern: "123123123",
    },
    {
      name: "Вложенные повторения",
      text: ("A".repeat(10) + "B".repeat(10)).repeat(100_000),
      pattern: "AAAAABBBBB",
    },
    {
      name: "Почти совпадения",
      text: "ABCE ABCR ABCO ABCP ABCW ABCK ABCN".repeat(500_000) + "ABCD",
      pattern: "ABCD",
    },
    {
      name: "Худший случай для наивного",
      text: "A".repeat(100_000),
      pattern: "A".repeat(10_000) + "B",
    },
    {
      name: "Короткий текст",
      text: "hello world".repeat(100),
      pattern: "world",
    },
    {
      name: "Шаблон не найден",
      text: "A".repeat(1_000_000),
      pattern: "B",
    },
    {
      name: "Случайный текст",
      text: generateRandomString(1_000_000, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
      pattern: generateRandomString(10_000, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    },
  ];

  console.log(
    "=== Сравнение производительности KMP и наивного алгоритма ===\n"
  );
  testCases.forEach(({ name, text, pattern }, index) => {
    console.log(`Тест ${index + 1}: ${name}`);
    console.log(
      `Длина текста: ${(text.length / 1_000_000).toFixed(1)} млн символов`
    );
    console.log(`Длина шаблона: ${pattern.length} символов`);

    // Наивный алгоритм
    const startNaive = performance.now();
    const naiveResult = naiveSearch(text, pattern);
    const naiveTime = performance.now() - startNaive;

    // Kvenir алгоритм
    const startKMP = performance.now();
    const kmpResult = kmpSearch(text, pattern);
    const kmpTime = performance.now() - startKMP;

    console.log(`Наивный: ${naiveTime.toFixed(2)} мс`);
    console.log(`KMP: ${kmpTime.toFixed(2)} мс`);
    console.log(`KMP быстрее в ${(naiveTime / kmpTime).toFixed(1)} раз`);
    console.log("");
  });
}

runPerformanceTests();
