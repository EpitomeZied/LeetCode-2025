/**
 * @param {number} n
 * @param {number[][]} meetings
 * @param {number} firstPerson
 * @return {number[]}
 */
var findAllPeople = function (n, meetings, firstPerson) {
    meetings.sort((a, b) => a[2] - b[2]);

    const parent = Array.from({ length: n }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        const px = find(x);
        const py = find(y);
        if (px !== py) parent[py] = px;
    }

    union(0, firstPerson);

    let i = 0;
    while (i < meetings.length) {
        let j = i;
        const involved = new Set();

        while (j < meetings.length && meetings[j][2] === meetings[i][2]) {
            const [x, y] = meetings[j];
            union(x, y);
            involved.add(x);
            involved.add(y);
            j++;
        }

        for (const person of involved) {
            if (find(person) !== find(0)) {
                parent[person] = person;
            }
        }

        i = j;
    }

    const result = [];
    for (let p = 0; p < n; p++) {
        if (find(p) === find(0)) result.push(p);
    }

    return result;
};