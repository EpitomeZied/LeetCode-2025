/**
 * @param {number[]} happiness
 * @param {number} k
 * @return {number}
 */
var maximumHappinessSum = function(happiness, k) {
     happiness.sort((a, b) => b - a);

    let sum = 0;

    for (let i = 0; i < k; i++) {
        const value = happiness[i] - i;
        if (value <= 0) break; 
        sum += value;
    }

    return sum;
};