// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function(head) {
  const dummy = new ListNode(0, head)

  let current = dummy
  while (current?.next?.next) {
    if (current.next.val === current.next.next.val) {
      const val = current.next.val

      while (current?.next.val === val) {
        current.next = current.next.next
      }
    } else {
      current = current.next
    }
  }

  return dummy.next
}

const listNode5 = new ListNode(4, null)
const listNode4 = new ListNode(3, listNode5)
const listNode3 = new ListNode(3, listNode4)
const listNode2 = new ListNode(2, listNode3)
const listNode1 = new ListNode(2, listNode2)
const head = new ListNode(1, listNode1)

let result = deleteDuplicates(head)
console.log(result);
