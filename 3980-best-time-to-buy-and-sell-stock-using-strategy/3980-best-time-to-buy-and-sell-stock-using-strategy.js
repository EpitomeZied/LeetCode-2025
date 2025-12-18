/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
    const n = prices.length;

    let baseProfit = 0;
    for (let i = 0; i < n; i++) {
        baseProfit += strategy[i] * prices[i];
    }

    const g0 = new Array(n);
    const g1 = new Array(n);

    for (let i = 0; i < n; i++) {
        g0[i] = (0 - strategy[i]) * prices[i];
        g1[i] = (1 - strategy[i]) * prices[i];
    }

    const P0 = new Array(n + 1).fill(0);
    const P1 = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        P0[i + 1] = P0[i] + g0[i];
        P1[i + 1] = P1[i] + g1[i];
    }

    const half = k / 2;
    let bestGain = 0;

    for (let l = 0; l + k <= n; l++) {
        const gain =
            (P0[l + half] - P0[l]) +
            (P1[l + k] - P1[l + half]);

        bestGain = Math.max(bestGain, gain);
    }

    return baseProfit + bestGain;
};