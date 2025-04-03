export class ListNode {
  constructor(public value: number, public next: ListNode | null = null) {}
}

function removeDuplicates(head: ListNode | null): ListNode | null {
  let current = head;
  while (current !== null) {
    let runner = current;
    while (runner.next !== null) {
      if (runner.next.value === current.value) {
        runner.next = runner.next.next;
      } else {
        runner = runner.next;
      }
    }
    current = current.next;
  }
  return head;
}

// доделать сортировку + теорема о рекуррентных соотношениях + lab_4
function sort(head: ListNode | null) {}

function removeDuplicates2(head: ListNode | null): ListNode | null {
  sort(head);

  let current = head;
  while (current !== null) {
    if (current.value === current.next?.value) {
      current.next = current.next?.next;
    }
    current = current.next;
  }
  return head;
}
