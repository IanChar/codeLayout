var Parser = exports = module.exports = {};

// Requirements
var fs = require('fs'),
    lt = require('./layoutTree.js')

Parser.ParseToTree = function(filename) {
  this.filename = filename;
  this.lines;
  this.tree = new lt.LayoutTree();
  this.currLineNum = 0;
}

Parser.ParseToTree.prototype.parseText = function() {
  var text = fs.readFileSync(this.filename, 'utf-8');
  this.lines = text.split('\n')
}

Parser.ParseToTree.prototype.constructChild = function(name, nodeType, level) {
  var n = new lt.Node(name, nodeType);
  var currLine = this.currLineNum + 1;
  var nextLevel = level + 1;
  var startIndex;
  while (this.atLeastLevel(currLine, nextLevel)) {
    // Set the start index
    if (this.lines[currLine].length != 0) {
      if (this.lines[currLine].charAt(0) == " ") {
        startIndex = nextLevel * 4;
      } else {
        startIndex = nextLevel;
      }
      // Check to see if there is a def
      if (this.lines[currLine].substring(startIndex, startIndex + 3) == "def") {
        var newName = this.lines[currLine].substring(startIndex + 4,
            this.lines[currLine].indexOf("("))
        n.addChild(this.constructChild(newName, lt.METHOD_TYPE, nextLevel))
      }
      // Check to see if there is Class
      else if (this.lines[currLine].substring(startIndex, startIndex + 5) == "class") {
        var name = this.lines[currLine].substring(startIndex + 4,
            this.lines[currLine].indexOf("("))
        n.addChild(this.constructChild(name, lt.CLASS_TYPE, nextLevel))
      }
    }
    currLine++;
  }
  this.currLineNum = currLine;
  return n;
}

Parser.ParseToTree.prototype.atLeastLevel = function(lineNum, levels) {
  // Trivial case should not occur
  if(levels == 0){
    console.log("Level is zero. Should not occur.");
    return false;
  }
  // Out of lines case
  if (lineNum >= this.lines.length) {
    return false;
  }
  // Empty string case keep moving...
  if (this.lines[lineNum].length == 0) {
    return true;
  }
  if(this.lines[lineNum].charAt(0).localeCompare(" ") == 0){
    var i = 0;
    while(i < levels){
      if(this.lines[lineNum].substring(i*4, 4+i*4).localeCompare("    ") != 0){
        return false;
      }
      i++;
    }
    return true;
  }
  else if(this.lines[lineNum].charAt(0).localeCompare("\t") == 0){
    var i = 0;
    while(i < levels){
      if(this.lines[lineNum].charAt(0).localeCompare("\t") != 0){
        return false;
      }
      i++;
    }
    return true;
  }
  else{
    // Character isn't space or tab
    return false;
  }
}

Parser.ParseToTree.prototype.fillTree = function() {
  this.parseText()
  this.currLineNum = 0;
  while (this.currLineNum < this.lines.length) {
    currLine = this.lines[this.currLineNum];
    if (currLine.length != 0) {
      // Check if method
      if (currLine.substring(0, 3) == "def") {
        var name = currLine.split(" ")[1];
        name = name.substring(0, name.indexOf("("));
        this.tree.addTopChild(this.constructChild(name, lt.METHOD_TYPE, 0));
      } else if (currLine.substring(0, 5) == "class") { // Check if class
        var name = currLine.split(" ")[1];
        name = name.substring(0, name.indexOf("("));
        this.tree.addTopChild(this.constructChild(name, lt.CLASS_TYPE, 0));
      } else {
        this.currLineNum++;
      }
    } else {
      this.currLineNum++;
    }
  }
  return this.tree;
}

Parser.ParseToTree.prototype.makeHtml = function() {
  var children = this.tree.getTopChildren();
  var fin = ""

  var findHtmlAttr = function(node, level) {
    console.log("<h" + level + "> " + node.getType() + " - " + node.getName() + "</h" + level + ">");
    var children = node.getChildren();
    for (var i = 0; i < children.length; i++) {
      findHtmlAttr(children[i], level + 1);
    }
  }

  for (var i = 0; i < children.length; i++) {
    fin += findHtmlAttr(children[i], 1);
  }
}


var p2t = new Parser.ParseToTree("assignment2-cata5492.py")
p2t.fillTree();
p2t.makeHtml();
