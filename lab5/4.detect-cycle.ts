function detectCycleDirected(adjList: Map<number, number[]>): boolean {
  // 1 - в обработке, 2 - обработана
  const color = new Map<number, 1 | 2>();

  function dfs(node: number): boolean {
    const currentColor = color.get(node);

    if (currentColor === 1) {
      return true;
    }

    if (currentColor === 2) {
      return false;
    }

    color.set(node, 1);

    const neighbors = adjList.get(node) || [];

    for (const nei of neighbors) {
      if (dfs(nei)) {
        return true;
      }
    }

    color.set(node, 2);

    return false;
  }

  for (const node of adjList.keys()) {
    if (!color.has(node)) {
      if (dfs(node)) {
        return true;
      }
    }
  }

  return false;
}

function detectCycleUndirected(adjList: Map<number, number[]>): boolean {
  const visited = new Set<number>();

  function dfs(node: number, parent: number | null): boolean {
    visited.add(node);

    const neighbors = adjList.get(node) || [];

    for (const nei of neighbors) {
      if (!visited.has(nei)) {
        const hasCycle = dfs(nei, node);
        if (hasCycle) {
          return true;
        }
      } else if (nei !== parent) {
        // нашли уже посещенную вершину, которая не является родителем
        return true;
      }
    }

    return false;
  }

  for (const node of adjList.keys()) {
    if (!visited.has(node)) {
      if (dfs(node, null)) {
        return true;
      }
    }
  }

  return false;
}

// 1) Ориентированный граф без цикла: 0 -> 1 -> 2
const directedA = new Map<number, number[]>([
  [0, [1]],
  [1, [2]],
  [2, []],
]);
console.log("Directed A:", [...directedA.entries()]);
console.log("Has cycle?", detectCycleDirected(directedA)); // false

// 2) Ориентированный граф с циклом: 0 -> 1 -> 2 -> 0
const directedB = new Map<number, number[]>([
  [0, [1]],
  [1, [2]],
  [2, [0]],
]);
console.log("Directed B:", [...directedB.entries()]);
console.log("Has cycle?", detectCycleDirected(directedB)); // true

// 3) Неориентированный граф без цикла: 0 -- 1 -- 2
const undirectedA = new Map<number, number[]>([
  [0, [1]],
  [1, [0, 2]],
  [2, [1]],
]);
console.log("Undirected A:", [...undirectedA.entries()]);
console.log("Has cycle?", detectCycleUndirected(undirectedA)); // false

// 4) Неориентированный граф с циклом: 0 -- 1 -- 2 -- 0
const undirectedB = new Map<number, number[]>([
  [0, [1, 2]],
  [1, [0, 2]],
  [2, [1, 0]],
]);
console.log("Undirected B:", [...undirectedB.entries()]);
console.log("Has cycle?", detectCycleUndirected(undirectedB)); // true
