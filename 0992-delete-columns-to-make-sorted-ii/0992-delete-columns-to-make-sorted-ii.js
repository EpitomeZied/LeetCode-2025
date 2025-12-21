/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    const n = strs.length;
    const m = strs[0].length;

    const sorted = new Array(n - 1).fill(false);
    let deletions = 0;

    for (let col = 0; col < m; col++) {
        let shouldDelete = false;

        for (let i = 0; i < n - 1; i++) {
            if (!sorted[i] && strs[i][col] > strs[i + 1][col]) {
                shouldDelete = true;
                break;
            }
        }

        if (shouldDelete) {
            deletions++;
            continue;
        }

        for (let i = 0; i < n - 1; i++) {
            if (!sorted[i] && strs[i][col] < strs[i + 1][col]) {
                sorted[i] = true;
            }
        }
    }
    return deletions;

};