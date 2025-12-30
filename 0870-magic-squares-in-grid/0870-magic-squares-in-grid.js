/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function isMagic(r, c) {
        if (grid[r + 1][c + 1] !== 5) return false;

        const seen = new Set();

        for (let i = r; i < r + 3; i++) {
            for (let j = c; j < c + 3; j++) {
                const val = grid[i][j];
                if (val < 1 || val > 9 || seen.has(val)) {
                    return false;
                }
                seen.add(val);
            }
        }

        const sum = grid[r][c] + grid[r][c + 1] + grid[r][c + 2];

        for (let i = 0; i < 3; i++) {
            if (
                grid[r + i][c] +
                grid[r + i][c + 1] +
                grid[r + i][c + 2] !== sum
            ) return false;
        }

        for (let j = 0; j < 3; j++) {
            if (
                grid[r][c + j] +
                grid[r + 1][c + j] +
                grid[r + 2][c + j] !== sum
            ) return false;
        }

        if (
            grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] !== sum ||
            grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] !== sum
        ) return false;

        return true;
    }

    for (let i = 0; i <= rows - 3; i++) {
        for (let j = 0; j <= cols - 3; j++) {
            if (isMagic(i, j)) count++;
        }
    }

    return count;
};
