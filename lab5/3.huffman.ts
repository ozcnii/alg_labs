type HuffmanNode = {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

function buildFrequencyMap(text: string): Map<string, number> {
  const freqMap = new Map<string, number>();
  for (const char of text) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }
  return freqMap;
}

function buildHuffmanTree(freqMap: Map<string, number>): HuffmanNode {
  const nodes: HuffmanNode[] = [];

  for (const [char, freq] of freqMap.entries()) {
    nodes.push({ char, freq });
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);

    const left = nodes.shift()!;
    const right = nodes.shift()!;

    const parent: HuffmanNode = {
      freq: left.freq + right.freq,
      left,
      right,
    };

    nodes.push(parent);
  }

  return nodes[0];
}

function buildCodes(
  node: HuffmanNode,
  prefix: string,
  codes: Record<string, string>
): void {
  if (node.char !== undefined) {
    codes[node.char] = prefix;
    return;
  }

  if (node.left) {
    buildCodes(node.left, prefix + "0", codes);
  }
  if (node.right) {
    buildCodes(node.right, prefix + "1", codes);
  }
}

export function encode(text: string): {
  encoded: string;
  tree: HuffmanNode;
  codes: Record<string, string>;
} {
  const freqMap = buildFrequencyMap(text);
  const tree = buildHuffmanTree(freqMap);
  const codes: Record<string, string> = {};

  buildCodes(tree, "", codes);

  let encoded = "";
  for (const char of text) {
    encoded += codes[char];
  }

  return { encoded, tree, codes };
}

export function decode(encoded: string, tree: HuffmanNode): string {
  let result = "";
  let node = tree;

  for (const bit of encoded) {
    node = bit === "0" ? node.left! : node.right!;

    if (node.char !== undefined) {
      result += node.char;
      node = tree;
    }
  }

  return result;
}

const text = "some example text123!";
const { encoded, tree, codes } = encode(text);
console.log("Codes:", codes);
console.log("Encoded:", encoded);
console.log("Decoded:", decode(encoded, tree));
