/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
    const map = new Map();
    for (const pat of allowed) {
        const key = pat.slice(0, 2);
        const val = pat[2];
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(val);
    }

    function dfs(row) {
        if (row.length === 1)
        return true;

        function buildNext(index, nextRow) {
            if (index === row.length - 1) {
                return dfs(nextRow);
            }

            const pair = row[index] + row[index + 1];
            if (!map.has(pair))
                return false;

            for (const ch of map.get(pair)) {
                if (buildNext(index + 1, nextRow + ch)) {
                    return true;
                }
            }
            return false;
        }

        return buildNext(0, "");
    }

    return dfs(bottom);
};