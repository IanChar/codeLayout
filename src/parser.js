var fs = require('fs')

var parseText = function() {
  var text = fs.readFileSync("testPython.py", 'utf-8');
  var lines = text.split('\n')
  console.log(lines)
}
