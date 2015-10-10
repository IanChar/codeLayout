var Parser = exports = module.exports = {};

// Requirements
var fs = require('fs'),
    lt = require('./layoutTree.js')

Parser.ParseToTree = function(filename) {
  this.filename = filename;
  this.lines;
  this.tree = new lt.LayoutTree();
}

Parser.ParseToTree.prototype.parseText = function() {
  var text = fs.readFileSync(this.filename, 'utf-8');
  this.lines = text.split('\n')
}

Parser.ParseToTree.prototype.constructChild = function(name, nodeType,lineNumber,
    level) {
  n = new lt.Node()
}

Parser.ParseToTree.prototype.fillTree = function() {
  this.parseText()
  for (var i = 0; i < lines.length; i++) {
    currLine = this.lines[i];
    if (currLine.substring(0, 3) == "def") {
      var name = currLine.split(" ")[1];
      name = name.substring(0, name.indexOf("("));
      this.tree.addChild(this.constructChild(name, lt.METHOD_TYPE, i, 0));
    } else if (currLine.substring(0, 4) == "Class") {
      var name = currLine.split(" ")[1];
      name = name.substring(0, name.indexOf("("));
      this.tree.addChild(this.constructChild(name, lt.CLASS_TYPE, i, 0));
    }
  }
  return this.tree;
}
