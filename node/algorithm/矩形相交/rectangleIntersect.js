/**
 * 检测两个矩形是否相交（顶点重叠和边线重叠不算相交）
 * @param {number[]} rec1 矩形1，左下角和右上角坐标组成的数组
 * @param {number[]} rec2 矩形2，左下角和右上角坐标组成的数组
 * @return {boolean} 是否相交
 */
function rectangleIntersect(rec1, rec2) {
  if(rec1 && rec1.length === 4 && rec2 && rec2.length === 4) {
    // 此逻辑只适合在第一象限内判断
    // return (
    //     (rec1[0] < rec2[0] && rec2[0] < rec1[2]) ||
    //     (rec1[0] < rec2[2] && rec2[2] < rec1[2])
    //   ) &&
    //   (
    //     (rec1[1] < rec2[1] && rec2[1] < rec1[3]) ||
    //     (rec1[1] < rec2[3] && rec2[1] < rec1[3])
    //   );

    /**
     * 计算
     * @param {number[]} axis1 包含同一个矩形两个点的X轴的值
     * @param {number[]} axis2 包含同一个矩形两个点的Y轴的值
     * @returns {boolean}
     */
    function axisComparison(axis1, axis2) {
      if(axis1[0] < axis2[0]) {
        return axis1[1] > axis2[0];
      } else if(axis1[0] === axis2[0]) {
        return true;
      } else {
        return axis2[1] > axis1[0];
      }
    }

    let xAxis = axisComparison([rec1[0], rec1[2]], [rec2[0], rec2[2]]);
    let yAxis = axisComparison([rec1[1], rec1[3]], [rec2[1], rec2[3]]);

    return xAxis && yAxis;
  } else {
    throw Error('必须传入合法的矩形坐标');
  }
}

const result = rectangleIntersect([0, 0, 2, 2], [1, 1, 3, 3]); // expect true
console.log(result === true);

const result2 = rectangleIntersect([0, 0, 1, 1], [1, 0, 2, 1]); // expect false
console.log(result2 === false);

const result3 = rectangleIntersect([229, -132, 833, 333], [-244, -577, 837, 804]); // expect true
console.log(result3 === true);

