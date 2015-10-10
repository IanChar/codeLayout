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
  this.parseText(0, 0)
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


var test = new Parser.ParseToTree('test.txt');
test.parseText();
console.log(test.lines);

//one indent (spaces)
console.log(test.atLeastLevel(0, 0));
console.log(test.atLeastLevel(0, 1));
console.log(test.atLeastLevel(0, 2));

//one indent (tab)
console.log(test.atLeastLevel(1, 0));
console.log(test.atLeastLevel(1, 1));
console.log(test.atLeastLevel(1, 2));

//two indents
console.log(test.atLeastLevel(2, 0));
console.log(test.atLeastLevel(2, 1));
console.log(test.atLeastLevel(2, 2));
console.log(test.atLeastLevel(2, 3));

//zero indents
console.log(test.atLeastLevel(3, 0));
console.log(test.atLeastLevel(3, 1));