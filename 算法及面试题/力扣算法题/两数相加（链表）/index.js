// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function(l1, l2) {
  if (!l1 || !l2) return

  let node1 = l1
  let node2 = l2
  let str1 = ''
  let str2 = ''

  // 循环求两个加数
  while (node1 || node2) {
    if (node1) {
      str1 = `${node1.val}` + str1

      if (node1.next) {
        node1 = node1.next
      } else {
        node1 = null
      }
    }

    if (node2) {
      str2 = `${node2.val}` + str2

      if (node2.next) {
        node2 = node2.next
      } else {
        node2 = null
      }
    }
  }

  // 求和
  const sum = parseInt(str1) + parseInt(str2)
  const sumArr = String(sum).split('')
  const lArr = new Array(sumArr.length)

  // 生成链表
  sumArr.forEach((number, index) => {
    let next = null

    if (index) {
      next = lArr[index - 1]
    }

    lArr[index] = (new ListNode(number, next))
  })

  return lArr[lArr.length - 1]
}

const listNode5 = new ListNode(4, null)
const listNode4 = new ListNode(3, listNode5)
const listNode3 = new ListNode(3, listNode4)
const listNode2 = new ListNode(2, listNode3)
const listNode1 = new ListNode(2, listNode2)
const l1 = new ListNode(1, listNode1)

const listNode9 = new ListNode(3, null)
const listNode8 = new ListNode(3, listNode9)
const listNode7 = new ListNode(5, listNode8)
const listNode6 = new ListNode(2, listNode7)
const l2 = new ListNode(4, listNode6)

let result = addTwoNumbers(l1, l2)
console.log(result)
