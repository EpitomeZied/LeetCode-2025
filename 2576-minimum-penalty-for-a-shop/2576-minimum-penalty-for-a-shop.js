/**
 * @param {string} customers
 * @return {number}
 */
var bestClosingTime = function (customers) {
    let n = customers.length;
    let penalty = 0;
    for (let c of customers) {
        if (c === 'Y') penalty++;
    } let minPenalty = penalty, bestHour = 0;
    for (let i = 0; i < n; i++) {
        if (customers[i] === 'Y') { penalty--; } else { penalty++; }
        if (penalty < minPenalty) { minPenalty = penalty; bestHour = i + 1; }
    } return bestHour;
};