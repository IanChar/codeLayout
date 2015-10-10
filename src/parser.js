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
  n = new lt.Node(name, nodeType);
  var currLine = this.currLineNum + 1;
  var nextLevel = level + 1;
  var startIndex;
  while (this.atLeastLevel(currLine, nextLevel)) {
    // Set the start index
    if (this.lines[currLine].charAt(0) == " ") {
      startIndex = level * 4;
    } else {
      startIndex = level;
    }
      // Check to see if there is a def
      if (this.lines[currLine].substring(startIndex, startIndex + 3) == "def") {
        var name = this.lines[currLine].substring(startIndex + 4,
            this.lines[currLine].indexOf("("))
        n.addChild(this.constructChild(name, lt.METHOD_TYPE, currLine,
            nextLevel))
      }
      // Check to see if there is Class
      else if (this.lines[currLine].substring(startIndex, startIndex + 4
            == "Class") {
        var name = this.lines[currLine].substring(startIndex + 4,
            this.lines[currLine].indexOf("("))
        n.addChild(this.constructChild(name, lt.CLASS_TYPE, currLine,
            nextLevel))
      }
    }
    this.currLineNum = currLine;
  }
}

Parser.ParseToTree.prototype.atLeastLevel = function(lineNum, levels) {
  if(levels == 0){
    console.log("Level is zero. Should not occur.");
    return false;
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
    console.log("Character is not a tab or a space.");
    return false;
  }
}

Parser.ParseToTree.prototype.fillTree = function() {
  this.parseText()
  this.currLineNum = 0;
  while (this.currLineNum < lines.length) {
    currLine = this.lines[i];
    if (currLine.substring(0, 3) == "def") {
      var name = currLine.split(" ")[1];
      name = name.substring(0, name.indexOf("("));
      this.tree.addChild(this.constructChild(name, lt.METHOD_TYPE, 0));
    } else if (currLine.substring(0, 4) == "Class") {
      var name = currLine.split(" ")[1];
      name = name.substring(0, name.indexOf("("));
      this.tree.addChild(this.constructChild(name, lt.CLASS_TYPE, 0));
    } else {
      this.currLineNum++;
    }
  }
  return this.tree;
}
