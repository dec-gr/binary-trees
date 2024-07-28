import { mergeSort } from './merge.js';

class Node {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(arr = []) {
    this.arr = arr;
    this.root = null;
  }

  buildTreeUnsorted(array) {
    this.root = this.buildTreeFunc(mergeSort(array));
    return this.root;
  }

  buildTree(array) {
    this.root = this.buildTreeFunc(array);
    return this.root;
  }

  buildTreeFunc(array) {
    const halfPoint = Math.floor(array.length / 2);

    const root = new Node(array[halfPoint]);

    if (array.length === 1) {
      return root;
    } else {
      const leftHalfRaw = array.slice(0, halfPoint);
      const rightHalfRaw = array.slice(halfPoint + 1);

      if (leftHalfRaw.length >= 1) {
        root.left = this.buildTreeFunc(leftHalfRaw);
      }
      if (rightHalfRaw.length >= 1) {
        root.right = this.buildTreeFunc(rightHalfRaw);
      }
    }
    return root;
  }

  insert(value, node = this.root) {
    //console.log(value, node);
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    // prettyPrint(this.root);

    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      node.data = this.nextBiggest(node.right).data;
      node.right = this.deleteItem(node.data, node.right);
    }
    return node;
  }

  nextBiggest(node) {
    let currentNode = node;

    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else if (value === currentNode.data) {
        return currentNode;
      }
    }
    return null;
  }

  levelOrder(callback) {
    if (callback === null) {
      throw new Error('Provide a callback function');
    }
    const queue = [];

    callback(this.root.data);

    if (this.root.left != null) {
      queue.push(this.root.left);
    }
    if (this.root.right != null) {
      queue.push(this.root.right);
    }
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }
      callback(node.data);
    }
  }

  inOrder(callback, node = this.root) {
    if (callback === null) {
      throw new Error('Provide a callback function');
    }
    if (node === null) {
      return;
    }

    if (node.left != null) {
      this.inOrder(callback, node.left);
    }

    callback(node.data);

    if (node.right != null) {
      this.inOrder(callback, node.right);
    }

    return;
  }

  preOrder(callback, node = this.root) {
    if (callback === null) {
      throw new Error('Provide a callback function');
    }
    if (node === null) {
      return;
    }

    callback(node.data);

    if (node.left != null) {
      this.inOrder(callback, node.left);
    }

    if (node.right != null) {
      this.inOrder(callback, node.right);
    }

    return;
  }

  postOrder(callback, node = this.root) {
    if (callback === null) {
      throw new Error('Provide a callback function');
    }
    if (node === null) {
      return;
    }

    if (node.left != null) {
      this.inOrder(callback, node.left);
    }

    if (node.right != null) {
      this.inOrder(callback, node.right);
    }

    callback(node.data);

    return;
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }

    const heightRight = this.height(node.right);
    const heightLeft = this.height(node.left);
    const maxHeight = heightRight > heightLeft ? heightRight : heightLeft;
    //console.log('Max Height of ' + node.data + ' = ' + maxHeight);
    return 1 + maxHeight;
  }

  depth(node = this.root) {
    let currentNode = this.root;
    let depth = 0;

    while (currentNode != null) {
      if (node.data > currentNode.data) {
        currentNode = currentNode.right;
      } else if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (node.data === currentNode.data) {
        return depth;
      }

      depth++;
    }
    return null;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const heightRight = this.height(node.right);
    const heightLeft = this.height(node.left);

    const isBalanced = Math.abs(heightRight - heightLeft) <= 1;

    const isRightBalanced = this.isBalanced(node.right);
    const isLeftBalanced = this.isBalanced(node.left);

    return isRightBalanced && isLeftBalanced && isBalanced;
  }

  reBalance() {
    const unSortedArray = [];
    const callbackFunction = (x) => {
      unSortedArray.push(x);
    };
    this.inOrder((x) => callbackFunction(x));

    this.buildTreeUnsorted(unSortedArray);
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}
