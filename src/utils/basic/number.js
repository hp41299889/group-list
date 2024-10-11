export const getNumberIntervals = (numberIntervals) => {
  const sortedIntervals = [...numberIntervals].sort((a, b) => a[0] - b[0]);
  const overlap = [];
  const mergedOverlap = [];
  const notInclude = [];

  numberIntervals.forEach((currentInterval, i, array) => {
    array.slice(i + 1).forEach((nextInterval) => {
      const [start, end] = [
        Math.max(currentInterval[0], nextInterval[0]),
        Math.min(currentInterval[1], nextInterval[1]),
      ];
      if (start <= end) {
        overlap.push([start, end]);
      }
    });
  });
  overlap.sort((a, b) => a[0] - b[0]);
  overlap.forEach((interval) => {
    if (
      !mergedOverlap.length ||
      mergedOverlap[mergedOverlap.length - 1][1] < interval[0]
    ) {
      mergedOverlap.push(interval);
    } else {
      mergedOverlap[mergedOverlap.length - 1][1] = Math.max(
        mergedOverlap[mergedOverlap.length - 1][1],
        interval[1]
      );
    }
  });

  let lastEnd = -1;
  sortedIntervals.forEach(([start, end]) => {
    if (start > lastEnd + 1) {
      notInclude.push([lastEnd + 1, start - 1]);
    }
    lastEnd = Math.max(lastEnd, end);
  });

  if (lastEnd < 20) {
    notInclude.push([lastEnd + 1, 20]);
  }

  return { overlap: mergedOverlap, notInclude };
};
