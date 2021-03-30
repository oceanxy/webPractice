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

  //----------------------------解法一：暴力法------------------------------
  // let node1 = l1
  // let node2 = l2
  // let str1 = ''
  // let str2 = ''
  //
  // // 循环求两个加数
  // while (node1 || node2) {
  //   if (node1) {
  //     str1 = `${node1.val}` + str1
  //
  //     if (node1.next) {
  //       node1 = node1.next
  //     } else {
  //       node1 = null
  //     }
  //   }
  //
  //   if (node2) {
  //     str2 = `${node2.val}` + str2
  //
  //     if (node2.next) {
  //       node2 = node2.next
  //     } else {
  //       node2 = null
  //     }
  //   }
  // }
  //
  // // 求和
  // const sum = (BigInt(str1) + BigInt(str2)).toString()
  // const sumArr = sum.split('')
  // const lArr = new Array(sumArr.length)
  //
  // // 生成链表
  // sumArr.forEach((number, index) => {
  //   let next = null
  //
  //   if (index) {
  //     next = lArr[index - 1]
  //   }
  //
  //   lArr[index] = new ListNode(number, next)
  // })
  //
  // return lArr[lArr.length - 1]

  //----------------------------解法二：数组相同索引位相加------------------------------
  let node1 = l1, node2 = l2
  const head = new ListNode()
  let currentNode = head
  let carry = false

  while (
    node1 || node2 || // 如果node1或node2存在，则相加
    carry // 如果node1和node2皆不存在，此时判断是否存在上一次的进位，如存在则要在链表末尾添加一个进位结点
    ) {
    // 计算 node1、node2 以及 上一次相加得到的进位数 三者之和
    let sum = (node1?.val ?? 0) + (node2?.val ?? 0) + (carry ? 1 : 0)

    // 进位
    if (sum >= 10) {
      sum -= 10
      carry = true
    } else {
      carry = false
    }

    currentNode.next = new ListNode(sum, null)
    currentNode = currentNode.next
    node1 = node1?.next
    node2 = node2?.next
  }

  return head.next
}

const listNode5 = new ListNode(4, null)
const listNode4 = new ListNode(3, listNode5)
const listNode3 = new ListNode(3, listNode4)
const listNode2 = new ListNode(2, listNode3)
const listNode1 = new ListNode(2, listNode2)
const l1 = new ListNode(1, listNode1)

// const listNode13 = new ListNode(1, null)
// const listNode12 = new ListNode(0, listNode13)
// const listNode11 = new ListNode(0, listNode12)
// const listNode10 = new ListNode(0, listNode11)
// const listNode90 = new ListNode(0, listNode10)
// const listNode80 = new ListNode(0, listNode90)
// const listNode70 = new ListNode(0, listNode80)
// const listNode60 = new ListNode(0, listNode70)
// const listNode5 = new ListNode(0, listNode60)
// const listNode4 = new ListNode(0, listNode5)
// const listNode3 = new ListNode(0, listNode4)
// const listNode2 = new ListNode(0, listNode3)
// const listNode1 = new ListNode(0, listNode2)
// const l1 = new ListNode(1, listNode1)

const listNode9 = new ListNode(3, null)
const listNode8 = new ListNode(3, listNode9)
const listNode7 = new ListNode(5, listNode8)
const listNode6 = new ListNode(2, listNode7)
const l2 = new ListNode(4, listNode6)

let result = addTwoNumbers(l1, l2)
console.log(result)
