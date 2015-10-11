var parser = require('./parser.js'),
    grabber = require('./grabUrl.js'),
    fs = require('fs');

var makeHtml = function() {
  var toTree = new parser.ParseToTree("assignment2-cata5492.py");
  var tree = toTree.fillTree();
  console.log(tree);
  var children = tree.getTopChildren();
  var metaAcc = ""
  for (var i = 0; i < children.length; i++) {
    metaAcc += accHtml(children[i], 1, "");
  }
  console.log(metaAcc);
  // fs.appendFile("AwesomeDemo.html", metaAcc, function(err) {
  //   if (err) {
  //     console.log("uh oh");
  //   }
  // })
}

var accHtml = function(node, level, acc) {
  acc += "<h" + level + "> " + node.getType() + "- " + node.getName() + "</h" + level + ">";
  var children = node.getChildren();
  for (var i = 0; i < children.length; i++) {
    accHtml(children[i], level + 1, acc);
  }
  return acc;
}
 makeHtml()
