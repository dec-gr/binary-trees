import { Tree } from './bst.js';

const array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

console.log(array);

const tree = new Tree();

tree.buildTreeUnsorted(array);

tree.prettyPrint();

console.log(tree.isBalanced());

console.log('Level Order: ');
tree.levelOrder((x) => {
  console.log(x);
});

console.log('Pre Order: ');
tree.preOrder((x) => {
  console.log(x);
});

console.log('Post Order: ');
tree.postOrder((x) => {
  console.log(x);
});

console.log('In Order Order: ');
tree.inOrder((x) => {
  console.log(x);
});

tree.insert(101);
tree.insert(140);
tree.insert(150);

tree.prettyPrint();

console.log(tree.isBalanced());

tree.reBalance();

tree.prettyPrint();

console.log(tree.isBalanced());

console.log('Level Order: ');
tree.levelOrder((x) => {
  console.log(x);
});

console.log('Pre Order: ');
tree.preOrder((x) => {
  console.log(x);
});

console.log('Post Order: ');
tree.postOrder((x) => {
  console.log(x);
});

console.log('In Order Order: ');
tree.inOrder((x) => {
  console.log(x);
});
