/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 */
var minimumBoxes = function (apple, capacity) {
    const totalApples = apple.reduce((a, b) => a + b, 0);
    capacity.sort((a, b) => b - a);

    let used = 0;
    let sum = 0;

    for (let box of capacity) {
        sum += box;
        used++;
        if (sum >= totalApples) return used;
    }

    return used;
};