/**
 * @param {number[]} prices
 * @param {number} k
 * @return {number}
 */
var maximumProfit = function (prices, k) {
    const OO = -1e18;

    // dp[t][0] = flat , dp[t][1] = long , dp[t][2] = short
    let dp = Array.from({ length: k + 1 }, () => [OO, OO, OO]);
    dp[0][0] = 0;

    for (const price of prices) {
        const nwdp = dp.map(row => row.slice());

        for (let t = 0; t <= k; t++) {
            // Long
            nwdp[t][1] = Math.max(nwdp[t][1], dp[t][0] - price);

            // Short
            nwdp[t][2] = Math.max(nwdp[t][2], dp[t][0] + price);

            // Close long
            if (t + 1 <= k) {
                nwdp[t + 1][0] = Math.max(nwdp[t + 1][0], dp[t][1] + price);
            }

            // Close short
            if (t + 1 <= k) {
                nwdp[t + 1][0] = Math.max(nwdp[t + 1][0], dp[t][2] - price);
            }
        }

        dp = nwdp;
    }

    let ans = 0;
    for (let t = 0; t <= k; t++) {
        ans = Math.max(ans, dp[t][0]);
    }
    return ans;
};