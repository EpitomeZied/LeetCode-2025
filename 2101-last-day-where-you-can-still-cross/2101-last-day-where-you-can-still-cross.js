/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function (row, col, cells) {
    const n = cells.length;
    let left = 1, right = n, answer = 0;

    const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    const canCross = (day) => {
        const grid = Array.from({ length: row }, () =>
            new Array(col).fill(0)
        );
        for (let i = 0; i < day; i++) {
            const [r, c] = cells[i];
            grid[r - 1][c - 1] = 1;
        }

        const queue = [];
        for (let c = 0; c < col; c++) {
            if (grid[0][c] === 0) {
                queue.push([0, c]);
                grid[0][c] = 1; 
            }
        }

        let idx = 0;
        while (idx < queue.length) {
            const [r, c] = queue[idx++];
            if (r === row - 1) return true;

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (
                    nr >= 0 && nr < row &&
                    nc >= 0 && nc < col &&
                    grid[nr][nc] === 0
                ) {
                    grid[nr][nc] = 1;
                    queue.push([nr, nc]);
                }
            }
        }

        return false;
    };

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (canCross(mid)) {
            answer = mid;
            left = mid + 1; 
        } else {
            right = mid - 1;
        }
    }

    return answer;
};