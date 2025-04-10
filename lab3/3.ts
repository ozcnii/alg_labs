export class ListNode {
  constructor(public value: number, public next: ListNode | null = null) {}
}

function sort(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  const nodes: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    nodes.push(current);
    current = current.next;
  }

  heapSort(nodes);

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  nodes[nodes.length - 1].next = null;

  return nodes[0];
}

function heapSort(arr: ListNode[]) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
}

function heapify(arr: ListNode[], n: number, i: number) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left].value > arr[largest].value) {
    largest = left;
  }

  if (right < n && arr[right].value > arr[largest].value) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function removeDuplicates(head: ListNode | null): ListNode | null {
  head = sort(head);

  let current = head;
  while (current !== null) {
    if (current.value === current.next?.value) {
      current.next = current.next?.next;
    }
    current = current.next;
  }
  return head;
}

function createList(values: number[]): ListNode | null {
  if (values.length === 0) return null;

  const head = new ListNode(values[0]);
  let current = head;

  for (let i = 1; i < values.length; i++) {
    current.next = new ListNode(values[i]);
    current = current.next;
  }

  return head;
}

function listToString(head: ListNode | null): string {
  const values: number[] = [];
  let current = head;

  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }

  return values.join(" -> ");
}

const list = createList([4, 2, 1, 3, 2, 5, 4]);
console.log("Исходный список:");
console.log(listToString(list));

// Удаляем дубликаты
const uniqueList = removeDuplicates(list);
console.log("\nСписок без дубликатов:");
console.log(listToString(uniqueList));
