export const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const halfPoint = Math.floor(arr.length / 2);
  const leftHalfRaw = arr.slice(0, halfPoint);
  const rightHalfRaw = arr.slice(halfPoint);

  const leftHalf = mergeSort(leftHalfRaw);
  const rightHalf = mergeSort(rightHalfRaw);

  let sortedArray = [];

  const len = leftHalf.length + rightHalf.length;

  let leftHead = leftHalf.shift();
  let rightHead = rightHalf.shift();

  while (sortedArray.length < len) {
    if (leftHead < rightHead) {
      sortedArray.push(leftHead);
      leftHead = leftHalf.shift();
      if (leftHead === undefined) {
        sortedArray.push(rightHead);
        if (rightHalf.length > 0) {
          sortedArray = sortedArray.concat(rightHalf);
        }
      }
    } else {
      sortedArray.push(rightHead);
      rightHead = rightHalf.shift();
      if (rightHead === undefined) {
        sortedArray.push(leftHead);
        if (leftHalf.length > 0) {
          sortedArray = sortedArray.concat(leftHalf);
        }
      }
    }
  }
  return sortedArray;
};
