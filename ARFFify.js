"use strict";
exports.ARFFify=function(data){
  var headers = {};
  if (typeof(data)==='object') {
    for (var k in data) {
      switch
      headers[k]=data[k]
    };
  };
}