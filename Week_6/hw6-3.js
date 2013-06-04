homework.check1()
Now wait for the balancer to move data among the two shards more evenly. Periodically run:
> use config
> db.chunks.find( { ns:"week6.trades" }, {min:1,max:1,shard:1,_id:0} ).sort({min:1})
and/or:
db.chunks.aggregate( [
 { $match : { ns : "week6.trades" } } , 
 { $group : { _id : "$shard", n : { $sum : 1 } } }
] )
When done, run homework.c() and enter the result value.
That completes this week's homework. However if you want to explore more, something to try would be to try some queries and/or write operations with a single process down to see how the system behaves in such a situation.

> 2