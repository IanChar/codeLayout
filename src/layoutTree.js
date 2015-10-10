var layoutTree = exports = module.exports = {};

layoutTree.CLASS_TYPE = "Class"
layoutTree.METHOD_TYPE = "Method"
layoutTree.PARAMETER_TYPE = "Paramater"

// NODE CLASS
layoutTree.Node = function(nodeName, nodeType) {
  this.children = [];
  this.type = nodeType;
  this.name = nodeName;
}

layoutTree.Node.prototype.getChildren = function() {
  return this.children;
}

layoutTree.Node.prototype.getType = function() {
  return this.type;
}

layoutTree.Node.prototype.addChild = function(childNode) {
  this.children.push(childNode);
}

layoutTree.Node.prototype.getName = function(){
  return this.name;
}

// LAYOUTTREE CLASS
layoutTree.LayoutTree = function() {
  this.topChildren = [];
}

layoutTree.LayoutTree.prototype.getTopChildren = function() {
  return this.topChildren;
}

layoutTree.LayoutTree.prototype.addtopChild = function(topNode) {
  this.topChildren.push(topNode);
}

var n1 = new layoutTree.Node("Animal", layoutTree.CLASS_TYPE);
console.log(n1)
console.log(n1.getName())
