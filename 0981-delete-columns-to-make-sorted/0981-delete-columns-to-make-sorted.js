/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    let rows = strs.length, cols = strs[0].length;
    let deleteCount = 0;

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
            if (strs[row][col] > strs[row + 1][col]) {
                deleteCount++;
                break;
            }
        }
    }

    return deleteCount;
};