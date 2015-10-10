
CLASS_TYPE = "Class"
METHOD_TYPE = "Method"
PARAMETER_TYPE = "Paramater"

// NODE CLASS
var Node = function(nodeName, nodeType) {
  this.children = [];
  this.type = nodeType;
  this.name = nodeName;
}

Node.prototype.getChildren = function() {
  return this.children;
}

Node.prototype.getType = function() {
  return this.type;
}

Node.prototype.addChild = function(childNode) {
  this.children.push(childNode);
}

Node.prototype.getName = function(){
  return this.name;
}

// LAYOUTTREE CLASS
function LayoutTree() {
  this.topChildren = [];
}

LayoutTree.prototype.getTopChildren = function() {
  return this.topChildren;
}

LayoutTree.prototype.addtopChild = function(topNode) {
  this.topChildren.push(topNode);
}
