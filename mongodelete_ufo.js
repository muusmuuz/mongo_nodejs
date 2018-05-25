var MongoClient = require('db').MongoClient;
var url = 'mongodb://db/moiponeGateKeeper';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var cursor = db.tracking.aggregate([{
    $lookup:
       {
           from: "vehicle",
          localField: "vehicle.registrationNumber",
          foreignField: "registrationNumber",
          as: "tracking_docs"
            }
       },
      {
    $match: { "tracking_docs": { $eq: [] } }
      }
   ]);
  db.tracking.deleteMany({cursor});

 });
    
