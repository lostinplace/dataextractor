var oracle = require("oracle");

var connectData = { "tns": "snap59", "user": "zipcar", "password": "nokia548" };

oracle.connect(connectData,  function(err, connection) {
  if(err){ console.log("Connect err:" + err); }
  if(connection){ console.log("Connection:" + connection); }
  

  connection.execute('select * from vehicles where superseded_by is not null', [], function(queryErr, results){
    console.log(queryErr);
    console.log(results);
    console.log(results.length);
    connection.close();
  });
});