export class ListNode {
  constructor(public value: number, public next: ListNode | null = null) {}
}

function findLoopStart(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return null;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }

  if (!fast || !fast.next) {
    return null;
  }

  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }

  return slow;
}

// 1 -> 2 -> 3 -> 4 -> 5 -> 2
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
const node5 = new ListNode(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node2; // Петля

const loopStart = findLoopStart(node1);
console.log(
  loopStart ? "Петля найдена: " + loopStart.value : "Петля не найдена"
);
