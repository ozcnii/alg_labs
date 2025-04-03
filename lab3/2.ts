export class ListNode {
  constructor(
    public value: number,
    public next: ListNode | null = null,
    public random: ListNode | null = null
  ) {}
}

function copyRandomList(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let current: ListNode | null = head;

  while (current) {
    const newNode = new ListNode(current.value, current.next);
    current.next = newNode;
    current = newNode.next;
  }

  current = head;
  while (current) {
    if (current.random) {
      current.next!.random = current.random.next;
    }
    current = current.next!.next;
  }

  current = head;
  const newHead: ListNode = head.next!;
  let copyCurrent: ListNode | null = newHead;

  while (current) {
    current.next = copyCurrent!.next;
    current = current.next;

    if (copyCurrent!.next) {
      copyCurrent!.next = copyCurrent!.next.next;
      copyCurrent = copyCurrent!.next;
    }
  }

  return newHead;
}
