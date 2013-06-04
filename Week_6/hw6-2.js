> db.trades.ensureIndex( { ticker:1, time:1 } )
> // can now shard the trades collection on the shard key  { ticker:1, time:1 } 
After sharding the collection, look at the chunks which exist:
> use config
> db.chunks.find()
> // or:
> db.chunks.find({}, {min:1,max:1,shard:1,_id:0,ns:1})
Run homework.b() to verify the above and enter the return value below.

> 3