// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Event listener for clicks on links in a browser action popup.
// Open the link in a new tab of the current window.

//var n1 = new lt.Node("Animal", layoutTree.CLASS_TYPE);

/*
function onAnchorClick(event) {
  chrome.tabs.create({ url: event.srcElement.href });
  return false;
}
*/
var parent = ["animal", "same", "thanks"];
var parentType = ["class", "parameter", "method"];
var child = ["dingus", "dog", "cat"];

// Given an array of URLs, build a DOM list of these URLs in the
// browser action popup.
function buildPopupDom() {
  var popupDiv = document.getElementById('mostVisited_div');
  var ul = popupDiv.appendChild(document.createElement('ul'));

  for (var i = 0; i < parent.length; i++) {
    var li = ul.appendChild(document.createElement('li'));
	li.appendChild(document.createTextNode(parentType[i] + ": " + parent[i]));
	ul.appendChild(document.createTextNode(child[i]));
    //a.addEventListener('click', onAnchorClick);
  }
}

chrome.topSites.get(buildPopupDom);