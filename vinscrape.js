
var scraper = require('scraper'),
  fs = require('fs'),
  Q =require('q'),
  format = 'https://www.instavin.com/vehicles/:year:/Audi/A4',
  output = {},
  deferrals = [];

for (var i = 2015; i >= 2007; i--) {
  var index = i.toString(),
    url = format.replace(/:year:/, i);
  output[index] = [];
  deferrals.push(scrapePage(index));  
}

function scrapePage(index){
  var deferral = Q.defer();
  scraper(url, function(err, jQuery) {
    
    if (err) { console.log(err); }

    var anchors = jQuery.find('div.mainframe table a');

    for (var n = 0; n < (anchors.length > 5 ? 5 :anchors.length); n++) {
      output[index].push(anchors[n]._childNodes[0].__nodeValue);
    }

    deferral.resolve();
  });
  return deferral.promise;
}

console.log(deferrals.length + ' elements');
Q.all(deferrals).done(function(){
  fs.writeFile("./vins.json", JSON.stringify(output), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
  });   
});




