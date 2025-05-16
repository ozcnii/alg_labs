type HuffmanNode = {
  char?: string;
  freq: number;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

class MinHeap {
  private nodes: HuffmanNode[] = [];

  push(node: HuffmanNode): void {
    this.nodes.push(node);
    this.bubbleUp(this.nodes.length - 1);
  }

  pop(): HuffmanNode | undefined {
    if (this.nodes.length === 0) {
      return undefined;
    }

    if (this.nodes.length === 1) {
      return this.nodes.pop();
    }

    const min = this.nodes[0];
    this.nodes[0] = this.nodes.pop()!;
    this.bubbleDown(0);
    return min;
  }

  size(): number {
    return this.nodes.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.nodes[index].freq >= this.nodes[parentIndex].freq) {
        break;
      }

      [this.nodes[index], this.nodes[parentIndex]] = [
        this.nodes[parentIndex],
        this.nodes[index],
      ];

      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.nodes.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.nodes[left].freq < this.nodes[smallest].freq) {
        smallest = left;
      }
      if (
        right < length &&
        this.nodes[right].freq < this.nodes[smallest].freq
      ) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      [this.nodes[index], this.nodes[smallest]] = [
        this.nodes[smallest],
        this.nodes[index],
      ];

      index = smallest;
    }
  }
}

function buildFrequencyMap(text: string): Map<string, number> {
  const freqMap = new Map<string, number>();
  for (const char of text) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }
  return freqMap;
}

function buildHuffmanTree(freqMap: Map<string, number>): HuffmanNode {
  const heap = new MinHeap();

  for (const [char, freq] of freqMap.entries()) {
    heap.push({ char, freq });
  }

  while (heap.size() > 1) {
    const left = heap.pop()!;
    const right = heap.pop()!;

    const parent: HuffmanNode = {
      freq: left.freq + right.freq,
      left,
      right,
    };

    heap.push(parent);
  }

  return heap.pop()!;
}

function buildCodes(
  node: HuffmanNode,
  prefix: string,
  codes: Record<string, string>
): void {
  if (node.char !== undefined) {
    codes[node.char] = prefix || "0";
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
  if (!text) {
    return {
      encoded: "",
      tree: { freq: 0 },
      codes: {},
    };
  }

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
  if (!encoded || !tree) return "";

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

const text =
  "sщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooosщщщщщщooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooome example text123!";
const { encoded, tree, codes } = encode(text);
console.log("Codes:", codes);
console.log("Encoded:", encoded);
console.log("Decoded:", decode(encoded, tree));
