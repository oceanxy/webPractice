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
  if (!head) return head

  let current = head
  while (current.next) {
    if (current.val === current.next.val) {
      const val = current.val

      while (current.next && current.next.val === val) {
        current.next = current.next.next
      }
    } else {
      current = current.next
    }
  }

  return head
}

const listNode5 = new ListNode(4, null)
const listNode4 = new ListNode(3, listNode5)
const listNode3 = new ListNode(3, listNode4)
const listNode2 = new ListNode(2, listNode3)
const listNode1 = new ListNode(2, listNode2)
const head = new ListNode(1, listNode1)

let result = deleteDuplicates(head)
console.log(result)
