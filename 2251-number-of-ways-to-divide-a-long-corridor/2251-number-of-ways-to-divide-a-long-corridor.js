/**
 * @param {string} corridor
 * @return {number}
 */
var numberOfWays = function (corridor) {
    const MOD = 1000000007;
    const n = corridor.length;
    const dp = Array.from({ length: n }, () => Array(3).fill(-1));

    const dfs = (i, seats) => {
        if (i === n) return seats === 2 ? 1 : 0;
        if (dp[i][seats] !== -1) return dp[i][seats];

        let res = 0;
        if (seats === 2) {
            if (corridor[i] === 'S') {
                res = dfs(i + 1, 1);
            } else {
                res = (dfs(i + 1, 0) + dfs(i + 1, 2)) % MOD;
            }
        } else {
            if (corridor[i] === 'S') {
                res = dfs(i + 1, seats + 1);
            } else {
                res = dfs(i + 1, seats);
            }
        }

        return (dp[i][seats] = res);
    };

    return dfs(0, 0);
};