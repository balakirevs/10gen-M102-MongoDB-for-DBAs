Final 1
-------

Answer: 9

Final 2
-------

Answer: 2
  Mongo preserves the order of writes in a collection in its consistency model. In this problem, 27003's oplog was effectively a "fork" and to preserve write ordering a rollback was necessary during 27003's recovery phase.


Final 3
-------

3 documents

>  bsondump test.foo.2013-03-11T10-25-48.0.bson 
{ "_id" : 7 }
{ "_id" : 8 }
{ "_id" : 9 }
3 objects found


Final 4
--------

z:PRIMARY> cfg = rs.conf()
z:PRIMARY> cfg.members[2].votes = 0
z:PRIMARY> cfg
{
        "_id" : "z",
        "version" : 1,
        "members" : [
                {
                        "_id" : 1,
                        "host" : "localhost:27001"
                },
                {
                        "_id" : 2,
                        "host" : "localhost:27002"
                },
                {
                        "_id" : 3,
                        "host" : "localhost:27003",
                        "votes" : 0
                }
        ]
}
z:PRIMARY> rs.reconfig(cfg)
{ "ok" : 1 }
 
~% mongo --shell a.js --port 27003
z:SECONDARY> part4()
233

Answer: 233

Final 5
-------

z:PRIMARY> a = {_id : 1,
  author : 'joe',
  title : 'Too big to fail',
  text : 'Sample text',
  tags : [ 'business', 'finance' ],
  when : ISODate("2008-11-03"),
  views : 23002,
  votes : 4,
  voters : ['joe', 'jane', 'bob', 'somesh'],
  comments : [
    { commenter : 'allan',
      comment : 'Well, i dont think so…',
      flagged:false, plus:2 },
    { commenter : 'chuck',
      comment : 'where is',
      flagged:true, plus:5 },
    { commenter : 'norris',
      comment : 'my leg',
      flagged:true, plus:77777777 },
 
  ]
}
 
z:PRIMARY> db.postings.insert(a)

One way to assure people vote at most once per posting is to use this form of update:
db.postings.update( 
  { _id:… , voters:{$ne:'joe'} },
  { $inc : {votes:1}, $push : {voters:'joe'} } );
Answer: 3


Final 6
-------

MongoDB supports atomic operations on individual documents.

MongoDB has a data type for Dates and DateTime data.

Answer: 2 & 4

Final 7
-------

MongoDB supports reads from slaves/secondaries that are in remote locations.
Answer: 2


Final 8
-------
mkdir ./data
mkdir ./data/configdb
mongod --configsvr --dbpath ./data/configdb --port 27019
mongorestore ./config_server --host 127.0.0.1:27019
 
~%/Documents/Mongo/dba/final.8$
~%/Documents/Mongo/dba/final.8$ mongo localhost:27019/config
MongoDB shell version: 2.2.2
connecting to: localhost:27018/config
configsvr>
configsvr> db
config
configsvr> db.chunks.find().sort({_id:1}).next().lastmodEpoch.toString().substr(20,4)
6554
configsvr> ^C
bye
~%/Documents/Mongo/dba/final.8$

> configsvr> db.chunks.find().sort({_id:1}).next().lastmodEpoch.getTimestamp().toString().substr(19,5)
> 07:07

Answer: 07:07

Final 9
-------
mongorestore --oplogReplay s1 --host SPHINX --port 27017
mongorestore --oplogReplay s2 --host SPHINX --port 27017

-- Update shards
>db.shards.update({"_id":"s1"},{$set : {"host":"localhost:27501"}})
>db.shards.update({"_id":"s2"},{$set : {"host":"localhost:27601"}})
configsvr> db.shards.find()
{ "_id" : "s1", "host" : "localhost:27501" }
{ "_id" : "s2", "host" : "localhost:27601" }


-- Run des deux shards
-- FAUX mongod --shardsvr --port 27501 --fork --logpath s1.log --replSet s1
-- FAUX mongod --shardsvr --port 27601 --fork --logpath s2.log --replSet s2
-- Pas de RS à préciser

>mongod --shardsvr --port 27501 --fork --logpath s1.log
> (remove /data/db/mongo.lock si besoin)
>mongod --shardsvr --port 27601 --fork --logpath s2.log

mongos> use snps
switched to db snps
mongos> db.elegans.aggregate([{$match:{N2:"T"}},{$group:{_id:"$N2",n:{$sum:1}}}]).result[0].n
47664

Final 10
--------
mongos> db.elegans.ensureIndex({"N2":1,"mutant":1})
removed == 1 + _files.size()
mongos> 
Answer: 10

Final 11
--------

1)
mongos> db.problem11.aggregate({$group : {_id:{n2 : "$N2" , mutant : "$mutant"}, count : {$sum:1}}})

2)
Pour le résultat final (count du champs "result" (array) : 

mongos> db.problem11.aggregate({$group : {_id:{n2 : "$N2" , mutant : "$mutant"}, count : {$sum:1}}}).result.length
31

On peut vérifier en testant les valeurs de la 1) : 

mongos> db.problem11.find({"N2":"a","mutant":"c"}).count()
> 21