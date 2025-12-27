/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0]);

  class MinHeap {
    constructor(compare) {
      this.data = [];
      this.compare = compare;
    }

    size() {
      return this.data.length;
    }

    peek() {
      return this.data[0];
    }

    push(val) {
      this.data.push(val);
      this._up(this.data.length - 1);
    }

    pop() {
      if (this.data.length === 1) return this.data.pop();
      const top = this.data[0];
      this.data[0] = this.data.pop();
      this._down(0);
      return top;
    }

    _up(i) {
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (this.compare(this.data[p], this.data[i]) <= 0) break;
        [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
        i = p;
      }
    }

    _down(i) {
      const n = this.data.length;
      while (true) {
        let s = i;
        const l = i * 2 + 1;
        const r = i * 2 + 2;
        if (l < n && this.compare(this.data[l], this.data[s]) < 0) s = l;
        if (r < n && this.compare(this.data[r], this.data[s]) < 0) s = r;
        if (s === i) break;
        [this.data[i], this.data[s]] = [this.data[s], this.data[i]];
        i = s;
      }
    }
  }

  const available = new MinHeap((a, b) => a - b);
  const busy = new MinHeap((a, b) =>
    a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
  );

  for (let i = 0; i < n; i++) available.push(i);

  const count = new Array(n).fill(0);

  for (const [start, end] of meetings) {
    const duration = end - start;

    while (busy.size() && busy.peek()[0] <= start) {
      const [, room] = busy.pop();
      available.push(room);
    }

    let room;
    if (available.size()) {
      room = available.pop();
      busy.push([end, room]);
    } else {
      const [finish, r] = busy.pop();
      room = r;
      busy.push([finish + duration, room]);
    }

    count[room]++;
  }

  let ans = 0;
  for (let i = 1; i < n; i++) {
    if (count[i] > count[ans]) ans = i;
  }

  return ans;
};
