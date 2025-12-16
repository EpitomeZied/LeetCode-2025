/**
 * @param {number} n
 * @param {number[]} present
 * @param {number[]} future
 * @param {number[][]} hierarchy
 * @param {number} budget
 * @return {number}
 */
var maxProfit = function (n, present, future, hierarchy, budget) {
    const NEG = -1e15;

    // Build tree
    const children = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of hierarchy) {
        children[u].push(v);
    }

    // Knapsack merge
    function merge(a, b) {
        const res = Array(budget + 1).fill(NEG);
        for (let i = 0; i <= budget; i++) {
            if (a[i] === NEG) continue;
            for (let j = 0; j + i <= budget; j++) {
                if (b[j] === NEG) continue;
                res[i + j] = Math.max(res[i + j], a[i] + b[j]);
            }
        }
        return res;
    }

    function dfs(u) {
        let dp0 = Array(budget + 1).fill(NEG); // u not bought
        let dp1F = Array(budget + 1).fill(NEG); // u bought full
        let dp1D = Array(budget + 1).fill(NEG); // u bought discounted

        dp0[0] = 0;

        const fullCost = present[u - 1];
        const discCost = Math.floor(present[u - 1] / 2);

        const fullProfit = future[u - 1] - fullCost;
        const discProfit = future[u - 1] - discCost;

        if (fullCost <= budget) dp1F[fullCost] = fullProfit;
        if (discCost <= budget) dp1D[discCost] = discProfit;

        for (const v of children[u]) {
            const [c0, c1F, c1D] = dfs(v);

            const bestFull = Array(budget + 1);
            const bestDisc = Array(budget + 1);

            for (let i = 0; i <= budget; i++) {
                bestFull[i] = Math.max(c0[i], c1F[i]);
                bestDisc[i] = Math.max(c0[i], c1D[i]);
            }

            dp0 = merge(dp0, bestFull);
            dp1F = merge(dp1F, bestDisc);
            dp1D = merge(dp1D, bestDisc);
        }

        return [dp0, dp1F, dp1D];
    }

    const [root0, root1F] = dfs(1);

    let ans = 0;
    for (let i = 0; i <= budget; i++) {
        ans = Math.max(ans, root0[i], root1F[i]);
    }
    return ans;
};
