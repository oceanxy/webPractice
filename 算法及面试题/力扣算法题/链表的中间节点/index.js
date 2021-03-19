// Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function(head) {
  let currentNode = head;
  const listArr = [];

  while(currentNode) {
    listArr.push(currentNode);
    currentNode = currentNode.next;
  }

  return listArr[Math.floor(listArr.length / 2)];
};

// 生成一个链表
const linkedList = function(arrLength) {
  let linkedList = [];
  for(let i = arrLength; i >= 0; i--) {
    let temp;
    temp = new ListNode(i + 1);
    temp.next = linkedList[0] || null;

    linkedList.unshift(temp);
  }

  return linkedList;
};

console.log('--------------------------------------------------');
const result = middleNode(linkedList(4)[0]);
console.log('链表中间节点', result);
console.log('执行结果是否正确：', result.val === 3);
console.log('--------------------------------------------------');
const result2 = middleNode(linkedList(5)[0]);
console.log('链表中间节点', result2);
console.log('执行结果是否正确：', result2.val === 4);
console.log('--------------------------------------------------');