import { mergeSort } from './merge.js';

console.log('hello');

class Node {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr = []) {
    this.arr = arr;
    this.root = null;
  }

  buildTreeUnsorted(array) {
    return this.buildTree(mergeSort(array));
  }

  buildTree(array) {
    console.log(array);
    const halfPoint = Math.floor(array.length / 2);

    const root = new Node(array[halfPoint]);
    console.log(root);

    if (array.length === 1) {
      return root;
    } else {
      const leftHalfRaw = array.slice(0, halfPoint);
      const rightHalfRaw = array.slice(halfPoint + 1);

      if (leftHalfRaw.length >= 1) {
        root.left = this.buildTree(leftHalfRaw);
      }
      if (rightHalfRaw.length >= 1) {
        root.right = this.buildTree(rightHalfRaw);
      }
    }
    console.log(root);
    return root;
  }
}

const tree = new Tree();

const te = tree.buildTree([1, 4, 9, 12, 99, 101]);

console.log(te);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.log(prettyPrint(te));

const tp = tree.buildTreeUnsorted([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

console.log(tp);

console.log(prettyPrint(tp));
