/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  for(let i in nums) {
    const index = nums.indexOf(target - nums[i], (+i + 1));

    if(index !== -1) {
      return [+i, index];
    }
  }
};

const result = twoSum([2, 5, 6, 8], 11);
console.log('执行结果:', result);
console.log('执行结果是否正确:', JSON.stringify(result) === JSON.stringify([1, 2]));

const result2 = twoSum([3, 2, 4], 6);
console.log('执行结果:', result2);
console.log('执行结果是否正确:', JSON.stringify(result2) === JSON.stringify([1, 2]));